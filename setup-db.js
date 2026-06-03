require('dotenv').config();
const fs = require('fs');
const mysql = require('mysql2');
const path = require('path');

const host = process.env.MYSQL_HOST || 'localhost';
const port = process.env.MYSQL_PORT || 3306;
const user = process.env.MYSQL_USER || 'root';
const password = process.env.MYSQL_PASSWORD || '';
const database = process.env.MYSQL_DATABASE || 'insta';

const db = mysql.createConnection({
  host,
  port: parseInt(port),
  user,
  password,
  multipleStatements: true
});

db.connect(err => {
  if (err) {
    console.error('❌ Connection error:', err.message);
    process.exit(1);
  }
  
  console.log(`\n========================================`);
  console.log(`🔌 Connected to MySQL at ${host}:${port}`);
  console.log(`🏗️  Creating database: ${database}...`);
  console.log(`========================================\n`);

  db.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`, (err) => {
    if (err) {
      console.error('❌ Error creating database:', err.message);
      process.exit(1);
    }
    
    console.log(`✅ Database created/exists. Switching to database ${database}...`);
    db.query(`USE \`${database}\`;`, (err) => {
      if (err) {
        console.error('❌ Error switching database:', err.message);
        process.exit(1);
      }
      
      console.log('📄 Reading db.sql...');
      const sqlStr = fs.readFileSync(path.join(__dirname, 'db.sql'), 'utf8');
      
      console.log('⚡ Executing base db.sql...');
      db.query(sqlStr, (err) => {
        if (err) {
          if (err.code === 'ER_TABLE_EXISTS_ERROR' || err.message.includes('already exists')) {
            console.log('⚠️  Base db.sql tables already exist. Proceeding to migrations...');
          } else {
            console.error('❌ Error executing db.sql:', err.message);
            process.exit(1);
          }
        } else {
          console.log('✅ Base db.sql executed successfully.');
        }
        
        console.log('Now running migrations...');
        
        const migrations = [
          // User schema fixes
          "ALTER TABLE `users` ADD COLUMN `nickname` VARCHAR(255) COLLATE utf8mb4_bin NOT NULL DEFAULT '' AFTER `surname`",
          "ALTER TABLE `users` ADD COLUMN `cover_image` VARCHAR(255) COLLATE utf8mb4_bin NOT NULL DEFAULT ''",
          "ALTER TABLE `users` ADD COLUMN `account_status` ENUM('active', 'suspended') NOT NULL DEFAULT 'active'",
          "ALTER TABLE `users` ADD COLUMN `role` ENUM('user', 'admin') COLLATE utf8mb4_bin NOT NULL DEFAULT 'user' AFTER `lastOnline`",

          // Post schema fixes
          "ALTER TABLE `posts` ADD COLUMN `isNSFW` TINYINT(1) DEFAULT 0",
          "ALTER TABLE `posts` ADD COLUMN `nsfwTaggedByAuthor` TINYINT(1) DEFAULT 0",
          "ALTER TABLE `posts` ADD COLUMN `status` ENUM('pending', 'approved', 'rejected') COLLATE utf8mb4_bin NOT NULL DEFAULT 'approved' AFTER `post_time`",
          "ALTER TABLE `posts` ADD COLUMN `rejection_reason` VARCHAR(500) COLLATE utf8mb4_bin NOT NULL DEFAULT '' AFTER `status`",
          "UPDATE `posts` SET `status` = 'approved' WHERE `status` IS NULL",

          // Notifications schema modifications
          "ALTER TABLE `notifications` MODIFY `type` ENUM('follow','tag','like','share','shared_your_post','comment','favourites','recommend','add_grp_member','invite','change_admin','new_con','mention_post','mention_comment','friend_request','friend_accept','post_approved','post_rejected') NOT NULL",

          // Friend requests table creation
          "CREATE TABLE IF NOT EXISTS `friend_requests` (`request_id` int(11) NOT NULL AUTO_INCREMENT, `from_user` int(11) NOT NULL, `to_user` int(11) NOT NULL, `status` ENUM('pending','accepted','rejected') COLLATE utf8mb4_bin NOT NULL DEFAULT 'pending', `request_time` varchar(100) COLLATE utf8mb4_bin NOT NULL, `response_time` varchar(100) COLLATE utf8mb4_bin NOT NULL DEFAULT '', PRIMARY KEY (`request_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin"
        ];

        let completed = 0;
        let skipped = 0;

        const executeNext = (index) => {
          if (index >= migrations.length) {
            console.log(`\n🎉 Database setup & migration complete! ${completed} migrations executed, ${skipped} skipped/already applied.\n`);
            process.exit(0);
          }

          const stmt = migrations[index];
          db.query(stmt, (err) => {
            if (err) {
              // Gracefully skip column/table/key already exists errors
              if (err.code === 'ER_DUP_FIELDNAME' || err.code === 'ER_DUP_KEYNAME' || err.code === 'ER_TABLE_EXISTS_ERROR') {
                console.log(`⏭️  Skipped (already applied): ${stmt.substring(0, 60)}...`);
                skipped++;
              } else {
                console.error(`⚠️  Error executing: ${stmt.substring(0, 80)}...`);
                console.error(`   ${err.message}`);
                skipped++;
              }
            } else {
              console.log(`✅ Executed: ${stmt.substring(0, 60)}...`);
              completed++;
            }
            executeNext(index + 1);
          });
        };

        executeNext(0);
      });
    });
  });
});
