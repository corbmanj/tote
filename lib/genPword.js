const bcrypt = require('bcryptjs');

bcrypt.hash('Password1', 10, function(err, hash) {
    console.log(hash)
})

bcrypt.compare('Password1', '$2a$10$lvPcixM.tfY6/qC51bLm3.jPe347INEdIaOluoj.EfGntiQoxYqw2', function(err, res) {
    console.log(res);
})