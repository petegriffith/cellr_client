var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import 'dotenv/config';
import db from './knex.js';
import users from './routes/users.js';
import wines from './routes/wines.js';
import encounters from './routes/encounters.js';
const port = process.env.EXPRESS_PORT || 3000;
const setupServer = () => __awaiter(void 0, void 0, void 0, function* () {
    // Initialize express
    const app = express();
    // migrations and seeds
    console.log('running migrations');
    yield db.migrate.latest();
    console.log('running seeds');
    yield db.seed.run();
    //Middleware
    app.use(express.json());
    // API routes
    app.use('/users', users);
    app.use('/wines', wines);
    app.use('/encounters', encounters);
    app.listen(port, () => {
        console.log('app listening at port: ', port);
    });
});
setupServer();
