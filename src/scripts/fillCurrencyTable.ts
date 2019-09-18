import {createConnection, getManager} from "typeorm";
import fetch from 'node-fetch';

import {CurrencyEntity} from "../entities/currency.entity";

require('dotenv').config();

const commands = ['version', 'migrate', 'rollback', 'migration', 'seed'];
const command = process.argv[2];

// The template for database migration files (see templates/*.js)
const version = new Date().toISOString().substr(0, 16).replace(/\D/g, '');
const template = `
module.exports.up = async (db) => {
  
};

module.exports.down = async (db) => {
  
};

module.exports.configuration = { transaction: true };
`;

function wrap(task, action) {
  const name = process.argv[2] ? `${task} ${process.argv[2]}` : task;
  const start = new Date();

  process.stdout.write(`Starting '${name}'...\n`);

  return action().then(
    () => process.stdout.write(`Finished '${name}' after ${new Date().getTime() - start.getTime()}ms\n`),
    error => process.stderr.write(`${error.stack}\n`));
}

process.nextTick(() => wrap('db', async () => {
  let db;

  if (!commands.includes(command))
    throw new Error(`Unknown command: ${command}`);

  try {
    switch (command) {
      case 'currency':
        createConnection().then(async (connection) => {
          const currencyRepository = getManager().getRepository(CurrencyEntity);

          await fetch('https://www.cbr-xml-daily.ru/daily_json.js', {method: "GET"})
            .then(res => res.json())
            .then(async data => {
              const currencies: CurrencyEntity[] = [];
              if (data.Valute)
                data.Valute.forEach((valute) => {
                  const currency = new CurrencyEntity();
                  currency.id = valute.ID;
                  currency.name = valute.Name;
                  currency.rate = valute.Value;
                  currencies.push(currency)
                });

              await currencyRepository.save(currencies);
            })
            .catch(err => console.log(err));

        }).catch((error) => console.log("TypeORM connection error: ", error));
        break;
      default: break;
    }
  } finally {
    if (db) {
      await db.destroy();
    }
  }
}));


