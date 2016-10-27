/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Stick from '../api/stick/stick.model';

Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
            + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
            + 'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, '
            + 'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep '
            + 'tests alongside code. Automatic injection of scripts and '
            + 'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more '
            + 'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript '
            + 'payload, minifies your scripts/css/images, and rewrites asset '
            + 'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku '
            + 'and openshift subgenerators'
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });

Stick.find({}).remove()
  .then(() => {
    Stick.create(
      {
        "id": "pk100-senior",
        "category": "senior",
        "name": "PK100",
        "weight": 420,
        "series": "Primo",
        "price": 179.99,
        "description": "Our Primo PK100 is a true-one piece stick made in small batches from high grade Toray carbon. Each layer of laminate is hand rolled to ensure strength and consistency. Our mono-compression molding process improves the sticks balance.\nThe PK100 flex profile accommodates a variety of shooting styles. Whether you’re taking slap shots from the point or quick wrist shots in close to the net, you’ll be able to maximize the transfer of energy in your shot—improving shot speed and accuracy.",
        "tagline": "One-liner needed.",
        "features": {
          "kickpoint": "Mid Kick",
          "blade": "More pop",
          "shaft": "Concave"
        },
        "images": {
          "root_path": "/assets/images/sticks/pk/",
          "key": "pk100_",
          "profile": "pk100_profile.png",
          "personalize": "pk100_personalize.svg",
          "svg": "pk100_scene.svg"
        },
        "colors": {
          "shaft": [
            {"name": "White", "hex": "#ffffff"},
            {"name": "", "hex": "#8B8D8D"},
            {"name": "", "hex": "#1F355E"},
            {"name": "", "hex": "#7A232D"},
            {"name": "", "hex": "#EC1C24"},
            {"name": "", "hex": "#E7FF00"},
            {"name": "", "hex": "#EE5225"},
            {"name": "", "hex": "#3EF702"}
          ],
          "accent": [
            {"name": "White", "hex": "#ffffff"},
            {"name": "Black", "hex": "#000000"},
            {"name": "", "hex": "#25A9E0"},
            {"name": "", "hex": "#F05A28"},
            {"name": "", "hex": "#F9EC31"},
            {"name": "", "hex": "#652D90"},
            {"name": "", "hex": "#3EF702"}
          ],
          "logo": [
            {"name": "White", "hex": "#ffffff"},
            {"name": "Black", "hex": "#000000"},
            {"name": "", "hex": "#3EF702"},
            {"name": "", "hex": "#E4AD24"},
            {"name": "", "hex": "#EB008B"},
            {"name": "", "hex": "#8B8D8D"}
          ]
        },
        "flexes": [
          {value: "77", legend: "Flexible"},
          {value: "87"},
          {value: "102"},
          {value: "112", legend: "Stiff"}
        ],
        "patterns": [
          {value: "Z28", legend: "Toe"},
          {value: "Z39"},
          {value: "Z11"},
          {value: "Z9C"},
          {value: "ZM83"},
          {value: "Z20", legend: "Heel"}
        ]
      },
      {
        "id": "pk100-int",
        "category": "intermediate",
        "name": "PK100",
        "weight": 400,
        "series": "Primo",
        "price": 169.99,
        "description": "Our Primo PK100 is a true-one piece stick made in small batches from high grade Toray carbon. Each layer of laminate is hand rolled to ensure strength and consistency. Our mono-compression molding process improves the sticks balance.\nThe PK100 flex profile accommodates a variety of shooting styles. Whether you’re taking slap shots from the point or quick wrist shots in close to the net, you’ll be able to maximize the transfer of energy in your shot—improving shot speed and accuracy.",
        "tagline": "One-liner needed.",
        "features": {
          "kickpoint": "Mid Kick",
          "blade": "More pop",
          "shaft": "Concave"
        },
        "images": {
          "root_path": "/assets/images/sticks/pk/",
          "key": "pk100_",
          "profile": "pk100_profile.png",
          "personalize": "pk100_personalize.svg",
          "svg": "pk100_scene.svg"
        },
        "colors": {
          "shaft": [
            {"name": "White", "hex": "#ffffff"},
            {"name": "", "hex": "#8B8D8D"},
            {"name": "", "hex": "#1F355E"},
            {"name": "", "hex": "#7A232D"},
            {"name": "", "hex": "#EC1C24"},
            {"name": "", "hex": "#E7FF00"},
            {"name": "", "hex": "#EE5225"},
            {"name": "", "hex": "#3EF702"}
          ],
          "accent": [
            {"name": "White", "hex": "#ffffff"},
            {"name": "Black", "hex": "#000000"},
            {"name": "", "hex": "#25A9E0"},
            {"name": "", "hex": "#F05A28"},
            {"name": "", "hex": "#F9EC31"},
            {"name": "", "hex": "#652D90"},
            {"name": "", "hex": "#3EF702"}
          ],
          "logo": [
            {"name": "White", "hex": "#ffffff"},
            {"name": "Black", "hex": "#000000"},
            {"name": "", "hex": "#3EF702"},
            {"name": "", "hex": "#E4AD24"},
            {"name": "", "hex": "#EB008B"},
            {"name": "", "hex": "#8B8D8D"}
          ]
        },
        "flexes": [
          {value: "60", legend: "Flexible"},
          {value: "65"},
          {value: "70", legend: "Stiff"}
        ],
        "patterns": [
          {value: "Z28", legend: "Toe"},
          {value: "Z39"},
          {value: "Z11"},
          {value: "Z9C", legend: "Heel"}
        ]
      },
      {
        "id": "pk100-jr",
        "category": "junior",
        "name": "PK100",
        "weight": 390,
        "series": "Primo",
        "price": 159.99,
        "description": "Our Primo PK100 is a true-one piece stick made in small batches from high grade Toray carbon. Each layer of laminate is hand rolled to ensure strength and consistency. Our mono-compression molding process improves the sticks balance.\nThe PK100 flex profile accommodates a variety of shooting styles. Whether you’re taking slap shots from the point or quick wrist shots in close to the net, you’ll be able to maximize the transfer of energy in your shot—improving shot speed and accuracy.",
        "tagline": "One-liner needed.",
        "features": {
          "kickpoint": "Mid Kick",
          "blade": "More pop",
          "shaft": "Concave"
        },
        "images": {
          "root_path": "/assets/images/sticks/pk/",
          "key": "pk100_",
          "profile": "pk100_profile.png",
          "personalize": "pk100_personalize.svg",
          "svg": "pk100_scene.svg"
        },
        "colors": {
          "shaft": [
            {"name": "White", "hex": "#ffffff"},
            {"name": "", "hex": "#8B8D8D"},
            {"name": "", "hex": "#1F355E"},
            {"name": "", "hex": "#7A232D"},
            {"name": "", "hex": "#EC1C24"},
            {"name": "", "hex": "#E7FF00"},
            {"name": "", "hex": "#EE5225"},
            {"name": "", "hex": "#3EF702"}
          ],
          "accent": [
            {"name": "White", "hex": "#ffffff"},
            {"name": "Black", "hex": "#000000"},
            {"name": "", "hex": "#25A9E0"},
            {"name": "", "hex": "#F05A28"},
            {"name": "", "hex": "#F9EC31"},
            {"name": "", "hex": "#652D90"},
            {"name": "", "hex": "#3EF702"}
          ],
          "logo": [
            {"name": "White", "hex": "#ffffff"},
            {"name": "Black", "hex": "#000000"},
            {"name": "", "hex": "#3EF702"},
            {"name": "", "hex": "#E4AD24"},
            {"name": "", "hex": "#EB008B"},
            {"name": "", "hex": "#8B8D8D"}
          ]
        },
        "flexes": [
          {value: "40", legend: "Flexible"},
          {value: "45"},
          {value: "50", legend: "Stiff"}
        ],
        "patterns": [
          {value: "Z39", legend: "Toe"},
          {value: "Z11"},
          {value: "Z9C", legend: "Heel"}
        ]
      },
      {
        "id": "pk1000-senior",
        "category": "senior",
        "name": "PK1000",
        "weight": 420,
        "series": "Primo",
        "price": 189.99,
        "description": "Our Primo PK1000 is a true one-piece stick. With an improved two-plate autoclave and vacuum extraction molding process, we’ve decreased stick weight by 15% without sacrificing durability.\n\nThe PK1000 is made in small batches to ensure strength and consistency. With an improved laminate structure and light weight reinforcement layers, we have created a combination of perfect balance and playability. \n\nUsing the same “wide-load” technology as the PK100, the PK1000 will maximize the transfer of energy in every shot you take.",
        "tagline": "One-liner needed.",
        "features": {
          "kickpoint": "Mid Kick",
          "blade": "More pop",
          "shaft": "Concave"
        },
        "images": {
          "root_path": "/assets/images/sticks/pk/",
          "key": "pk1000_",
          "profile": "pk1000_profile.png",
          "personalize": "pk1000_personalize.svg",
          "svg": "pk1000_scene.svg"
        },
        "colors": {
          "shaft": [
            {"name": "White", "hex": "#ffffff"},
            {"name": "", "hex": "#262F68"},
            {"name": "", "hex": "#EC1C24"},
            {"name": "", "hex": "#E7FF00"},
            {"name": "", "hex": "#EE5225"},
            {"name": "", "hex": "#3EF702"}
          ],
          "accent": [
            {"name": "", "hex": "#E4AD24"},
            {"name": "", "hex": "#BBBDBF"},
            {"name": "", "hex": "#25A9E0"},
            {"name": "", "hex": "#00FF00"},
            {"name": "", "hex": "#ED334D"},
            {"name": "", "hex": "#652D90"},
            {"name": "", "hex": "#ffffff"}
          ],
          "logo": [
            {"name": "White", "hex": "#ffffff"},
            {"name": "", "hex": "#BBBDBF"}
          ]
        },
        "flexes": [
          {value: "77", legend: "Flexible"},
          {value: "87"},
          {value: "102"},
          {value: "112", legend: "Stiff"}
        ],
        "patterns": [
          {value: "Z28", legend: "Toe"},
          {value: "Z39"},
          {value: "Z11"},
          {value: "Z9C"},
          {value: "ZM83"},
          {value: "Z20", legend: "Heel"}
        ]
      },
      {
        "id": "pk1000-int",
        "category": "intermediate",
        "name": "PK1000",
        "weight": 390,
        "series": "Primo",
        "price": 179.99,
        "description": "Our Primo PK1000 is a true one-piece stick. With an improved two-plate autoclave and vacuum extraction molding process, we’ve decreased stick weight by 15% without sacrificing durability.\n\nThe PK1000 is made in small batches to ensure strength and consistency. With an improved laminate structure and light weight reinforcement layers, we have created a combination of perfect balance and playability. \n\nUsing the same “wide-load” technology as the PK100, the PK1000 will maximize the transfer of energy in every shot you take.",
        "tagline": "One-liner needed.",
        "features": {
          "kickpoint": "Mid Kick",
          "blade": "More pop",
          "shaft": "Concave"
        },
        "images": {
          "root_path": "/assets/images/sticks/pk/",
          "key": "pk1000_",
          "profile": "pk1000_profile.png",
          "personalize": "pk1000_personalize.svg",
          "svg": "pk1000_scene.svg"
        },
        "colors": {
          "shaft": [
            {"name": "White", "hex": "#ffffff"},
            {"name": "", "hex": "#262F68"},
            {"name": "", "hex": "#EC1C24"},
            {"name": "", "hex": "#E7FF00"},
            {"name": "", "hex": "#EE5225"},
            {"name": "", "hex": "#3EF702"}
          ],
          "accent": [
            {"name": "", "hex": "#E4AD24"},
            {"name": "", "hex": "#BBBDBF"},
            {"name": "", "hex": "#25A9E0"},
            {"name": "", "hex": "#00FF00"},
            {"name": "", "hex": "#ED334D"},
            {"name": "", "hex": "#652D90"},
            {"name": "", "hex": "#ffffff"}
          ],
          "logo": [
            {"name": "White", "hex": "#ffffff"},
            {"name": "", "hex": "#BBBDBF"}
          ]
        },
        "flexes": [
          {value: "60", legend: "Flexible"},
          {value: "65"},
          {value: "70", legend: "Stiff"}
        ],
        "patterns": [
          {value: "Z28", legend: "Toe"},
          {value: "Z39"},
          {value: "Z11"},
          {value: "Z9C", legend: "Heel"}
        ]
      },
      {
        "id": "pk1000-jr",
        "category": "junior",
        "name": "PK1000",
        "weight": 380,
        "series": "Primo",
        "price": 159.99,
        "description": "Our Primo PK1000 is a true one-piece stick. With an improved two-plate autoclave and vacuum extraction molding process, we’ve decreased stick weight by 15% without sacrificing durability.\n\nThe PK1000 is made in small batches to ensure strength and consistency. With an improved laminate structure and light weight reinforcement layers, we have created a combination of perfect balance and playability. \n\nUsing the same “wide-load” technology as the PK100, the PK1000 will maximize the transfer of energy in every shot you take.",
        "tagline": "One-liner needed.",
        "features": {
          "kickpoint": "Mid Kick",
          "blade": "More pop",
          "shaft": "Concave"
        },
        "images": {
          "root_path": "/assets/images/sticks/pk/",
          "key": "pk1000_",
          "profile": "pk1000_profile.png",
          "personalize": "pk1000_personalize.svg",
          "svg": "pk1000_scene.svg"
        },
        "colors": {
          "shaft": [
            {"name": "White", "hex": "#ffffff"},
            {"name": "", "hex": "#262F68"},
            {"name": "", "hex": "#EC1C24"},
            {"name": "", "hex": "#E7FF00"},
            {"name": "", "hex": "#EE5225"},
            {"name": "", "hex": "#3EF702"}
          ],
          "accent": [
            {"name": "", "hex": "#E4AD24"},
            {"name": "", "hex": "#BBBDBF"},
            {"name": "", "hex": "#25A9E0"},
            {"name": "", "hex": "#00FF00"},
            {"name": "", "hex": "#ED334D"},
            {"name": "", "hex": "#652D90"},
            {"name": "", "hex": "#ffffff"}
          ],
          "logo": [
            {"name": "White", "hex": "#ffffff"},
            {"name": "", "hex": "#BBBDBF"}
          ]
        },
        "flexes": [
          {value: "40", legend: "Flexible"},
          {value: "45"},
          {value: "50", legend: "Stiff"}
        ],
        "patterns": [
          {value: "Z39", legend: "Toe"},
          {value: "Z11"},
          {value: "Z9C", legend: "Heel"}
        ]
      },
      {
        "id": "k1-senior",
        "category": "senior",
        "name": "K1",
        "weight": 420,
        "series": "Nova",
        "price": 189.99,
        "description": "The Nova K1 is a true one-piece construction that features a high modulus Uni-directional carbon layover. Each layer of carbon is hand-rolled in small bathes to endure the highest quality.\n\nOur unique carbon fiber structure and toughened epoxy are molded and cured to create consistent balance, shaft strength, feel, and response.\n\nThe Low-Kick shaft flex profile creates a quick release for faster shots and improved accuracy.",
        "tagline": "One-liner needed.",
        "features": {
          "kickpoint": "Low Kick",
          "blade": "Most pop",
          "shaft": "Concave"
        },
        "images": {
          "root_path": "/assets/images/sticks/nova/",
          "key": "nova_k1_",
          "profile": "nova_k1_profile.png",
          "personalize": "nova_k1_personalize.svg",
          "svg": "nova_k1_scene.svg"
        },
        "colors": {
          "shaft": [
            {"name": "", "hex": "#262F68"},
            {"name": "", "hex": "#000000"}
          ],
          "accent": [
            {"name": "White", "hex": "#ffffff"},
            {"name": "", "hex": "#ED334D"},
            {"name": "", "hex": "#3EF702"},
            {"name": "", "hex": "#E7FF00"}
          ],
          "logo": [
            {"name": "White", "hex": "#ffffff"},
            {"name": "", "hex": "#EE5225"},
            {"name": "", "hex": "#6AC8CF"},
            {"name": "", "hex": "#8E4E9D"}
          ]
        },
        "flexes": [
          {value: "77", legend: "Flexible"},
          {value: "87"},
          {value: "102"},
          {value: "112", legend: "Stiff"}
        ],
        "patterns": [
          {value: "Z28", legend: "Toe"},
          {value: "Z39"},
          {value: "Z11"},
          {value: "Z9C"},
          {value: "ZM83"},
          {value: "Z20", legend: "Heel"}
        ]
      },
      {
        "id": "k1-int",
        "category": "intermediate",
        "name": "K1",
        "weight": 385,
        "series": "Nova",
        "price": 189.99,
        "description": "The Nova K1 is a true one-piece construction that features a high modulus Uni-directional carbon layover. Each layer of carbon is hand-rolled in small bathes to endure the highest quality.\n\nOur unique carbon fiber structure and toughened epoxy are molded and cured to create consistent balance, shaft strength, feel, and response.\n\nThe Low-Kick shaft flex profile creates a quick release for faster shots and improved accuracy.",
        "tagline": "One-liner needed.",
        "features": {
          "kickpoint": "Low Kick",
          "blade": "Most pop",
          "shaft": "Concave"
        },
        "images": {
          "root_path": "/assets/images/sticks/nova/",
          "key": "nova_k1_",
          "profile": "nova_k1_profile.png",
          "personalize": "nova_k1_personalize.svg",
          "svg": "nova_k1_scene.svg"
        },
        "colors": {
          "shaft": [
            {"name": "", "hex": "#262F68"},
            {"name": "", "hex": "#000000"}
          ],
          "accent": [
            {"name": "White", "hex": "#ffffff"},
            {"name": "", "hex": "#ED334D"},
            {"name": "", "hex": "#3EF702"},
            {"name": "", "hex": "#E7FF00"}
          ],
          "logo": [
            {"name": "White", "hex": "#ffffff"},
            {"name": "", "hex": "#EE5225"},
            {"name": "", "hex": "#6AC8CF"},
            {"name": "", "hex": "#8E4E9D"}
          ]
        },
        "flexes": [
          {value: "60", legend: "Flexible"},
          {value: "65"},
          {value: "70", legend: "Stiff"}
        ],
        "patterns": [
          {value: "Z28", legend: "Toe"},
          {value: "Z39"},
          {value: "Z11"},
          {value: "Z9C", legend: "Heel"}
        ]
      },
      {
        "id": "k1-jr",
        "category": "junior",
        "name": "K1",
        "weight": 365,
        "series": "Nova",
        "price": 169.99,
        "description": "The Nova K1 is a true one-piece construction that features a high modulus Uni-directional carbon layover. Each layer of carbon is hand-rolled in small bathes to endure the highest quality.\n\nOur unique carbon fiber structure and toughened epoxy are molded and cured to create consistent balance, shaft strength, feel, and response.\n\nThe Low-Kick shaft flex profile creates a quick release for faster shots and improved accuracy.",
        "tagline": "One-liner needed.",
        "features": {
          "kickpoint": "Low Kick",
          "blade": "Most pop",
          "shaft": "Concave"
        },
        "images": {
          "root_path": "/assets/images/sticks/nova/",
          "key": "nova_k1_",
          "profile": "nova_k1_profile.png",
          "personalize": "nova_k1_personalize.svg",
          "svg": "nova_k1_scene.svg"
        },
        "colors": {
          "shaft": [
            {"name": "", "hex": "#262F68"},
            {"name": "", "hex": "#000000"}
          ],
          "accent": [
            {"name": "White", "hex": "#ffffff"},
            {"name": "", "hex": "#ED334D"},
            {"name": "", "hex": "#3EF702"},
            {"name": "", "hex": "#E7FF00"}
          ],
          "logo": [
            {"name": "White", "hex": "#ffffff"},
            {"name": "", "hex": "#EE5225"},
            {"name": "", "hex": "#6AC8CF"},
            {"name": "", "hex": "#8E4E9D"}
          ]
        },
        "flexes": [
          {value: "40", legend: "Flexible"},
          {value: "45"},
          {value: "50", legend: "Stiff"}
        ],
        "patterns": [
          {value: "Z39", legend: "Toe"},
          {value: "Z11"},
          {value: "Z9C", legend: "Heel"}
        ]
      },
      {
        "id": "rx1-senior",
        "category": "senior",
        "disabled": true,
        "name": "RX1",
        "weight": 440,
        "series": "Alpha",
        "price": 169.99,
        "description": "The Alpha RX1 features a unique custom kick point flex profile that was designed for playmakers. The stick will flex where the player's bottom hand is placed.\n\nThe alpha 3-chamber blade core was designed to be more dampening which makes it easier to catch hard passes and improves puck feel.",
        "tagline": "One-liner needed.",
        "features": {
          "kickpoint": "Dual Kick",
          "blade": "More depending",
          "shaft": "Square"
        },
        "images": {
          "root_path": "/assets/images/sticks/alpha/",
          "key": "alpha_rx1_",
          "profile": "alpha_rx1_profile.png",
          "personalize": "alpha_rx1_personalize.png",
          "svg": "alpha_rx1_scene.svg"
        }
      },
      {
        "id": "rx1-int",
        "category": "intermediate",
        "disabled": true,
        "name": "RX1",
        "weight": 410,
        "series": "Alpha",
        "price": 169.99,
        "description": "The Alpha RX1 features a unique custom kick point flex profile that was designed for playmakers. The stick will flex where the player's bottom hand is placed.\n\nThe alpha 3-chamber blade core was designed to be more dampening which makes it easier to catch hard passes and improves puck feel.",
        "tagline": "One-liner needed.",
        "features": {
          "kickpoint": "Dual Kick",
          "blade": "More depending",
          "shaft": "Square"
        },
        "images": {
          "root_path": "/assets/images/sticks/alpha/",
          "key": "alpha_rx1_",
          "profile": "alpha_rx1_profile.png",
          "personalize": "alpha_rx1_personalize.svg",
          "svg": "alpha_rx1_scene.svg"
        }
      },
      {
        "id": "rx1-jr",
        "category": "junior",
        "disabled": true,
        "name": "RX1",
        "weight": 390,
        "series": "Alpha",
        "price": 159.99,
        "description": "The Alpha RX1 features a unique custom kick point flex profile that was designed for playmakers. The stick will flex where the player's bottom hand is placed.\n\nThe alpha 3-chamber blade core was designed to be more dampening which makes it easier to catch hard passes and improves puck feel.",
        "tagline": "One-liner needed.",
        "features": {
          "kickpoint": "Dual Kick",
          "blade": "More depending",
          "shaft": "Square"
        },
        "images": {
          "root_path": "/assets/images/sticks/alpha/",
          "key": "alpha_rx1_",
          "profile": "alpha_rx1_profile.png",
          "personalize": "alpha_rx1_personalize.svg",
          "svg": "alpha_rx1_scene.svg"
        }
      }
    )
    .then(() => {
      console.log('finished populating sticks');
    });
  });
