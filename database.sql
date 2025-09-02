create database xpenses_db;
use xpenses_db;
CREATE TABLE `allowance` (
  `allowance_id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` date NOT NULL,
  `amount_mmk` int(11) NOT NULL,
  `currency_rate` int(11) NOT NULL,
  `total_bhat` int(11) NOT NULL,
  `transfer_by` varchar(50) NOT NULL
);
INSERT INTO `allowance` (
    `allowance_id`,
    `date`,
    `amount_mmk`,
    `currency_rate`,
    `total_bhat`,
    `transfer_by`
  )
VALUES (
    1,
    '2025-04-18',
    1500000,
    774,
    11610,
    'Daw Ni Ni Aye'
  ),
  (
    2,
    '2025-02-26',
    1500000,
    750,
    11250,
    'Daw Ni Ni Aye'
  ),
  (
    3,
    '2025-03-20',
    1000000,
    750,
    7500,
    'Daw Ni Ni Aye'
  ),
  (
    4,
    '2025-04-02',
    1000000,
    750,
    7500,
    'U Mg Mg'
  ),
  (
    9,
    '2025-05-19',
    200000,
    740,
    1480,
    'Daw Ni Ni Aye'
  ),
  (
    6,
    '2025-01-25',
    1500000,
    750,
    11250,
    'Daw Ni Ni Aye'
  ),
  (
    7,
    '2025-02-13',
    3000000,
    750,
    22500,
    'Daw Ni Ni Aye'
  ),
  (
    10,
    '2025-05-27',
    500000,
    734,
    3670,
    'Daw Ni Ni Aye'
  ),
  (
    11,
    '2025-06-02',
    900000,
    738,
    6642,
    'Daw Ni Ni Aye'
  ),
  (
    12,
    '2025-06-17',
    500000,
    717,
    3585,
    'Daw Ni Ni Aye'
  ),
  (
    13,
    '2025-06-19',
    1300000,
    716.00,
    9308.00,
    'Daw Ni Ni Aye'
  ),
  (
    15,
    '2025-06-19',
    700000,
    706.00,
    4942.00,
    'Daw Ni Ni Aye'
  ),
  (
    16,
    '2025-07-15',
    1700000,
    720.00,
    12240.00,
    'Daw Ni Ni Aye'
  );
CREATE TABLE `transactions` (
  `trans_id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` date DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `amount` int(11) DEFAULT NULL
);
INSERT INTO `transactions` (
    `trans_id`,
    `date`,
    `category`,
    `details`,
    `amount`
  )
VALUES (1, '2025-01-15', 'Meals', 'Breakfast', 37.00),
  (2, '2025-01-20', 'Groceries', 'Coffee', 96.00),
  (3, '2025-01-25', 'Restaurant', 'Chester', 144.00),
  (
    4,
    '2025-01-28',
    'Transportation',
    'Bus fare',
    25.00
  ),
  (
    5,
    '2025-01-30',
    'Entertainment',
    'Movie ticket',
    180.00
  ),
  (6, '2025-02-02', 'Meals', 'Lunch', 65.00),
  (
    7,
    '2025-02-05',
    'Groceries',
    'Weekly shopping',
    320.00
  ),
  (8, '2025-02-08', 'Restaurant', 'Dinner', 220.00),
  (9, '2025-02-10', 'Transportation', 'Taxi', 45.00),
  (
    10,
    '2025-02-12',
    'Entertainment',
    'Concert',
    500.00
  ),
  (11, '2025-02-15', 'Meals', 'Dinner', 85.00),
  (12, '2025-02-18', 'Shopping', 'Clothes', 250.00),
  (13, '2025-02-20', 'Coffee', 'Starbucks', 120.00),
  (14, '2025-02-22', 'Transportation', 'BTS', 35.00),
  (15, '2025-02-25', 'Restaurant', 'Lunch', 180.00),
  (
    16,
    '2025-02-28',
    'Groceries',
    'Supermarket',
    450.00
  ),
  (17, '2025-03-02', 'Meals', 'Breakfast', 55.00),
  (
    18,
    '2025-03-05',
    'Entertainment',
    'Cinema',
    200.00
  ),
  (
    19,
    '2025-03-08',
    'Transportation',
    'Grab',
    80.00
  ),
  (20, '2025-03-10', 'Restaurant', 'Dinner', 300.00);