var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import db from '../knex.js';
const routes = Router();
routes.get('/allWines', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wines = yield db('wines');
        res.status(200).send(wines);
    }
    catch (err) {
        res.status(500);
        res.send(err);
    }
}));
routes.post('/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newWine = req.body;
        yield db('wines').insert(newWine);
        res.status(200).send(`${newWine.name} posted`);
    }
    catch (err) {
        res.status(500);
        res.send(err);
    }
}));
// This is a work in progress, obviously
routes.patch('/patchWine/:wine_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { wine_id } = req.params;
        const wineUpdates = req.body;
    }
    catch (err) {
        res.status(500);
        res.send(err);
    }
}));
routes.delete('/delete/:wine_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { wine_id } = req.params;
        const int_wine_id = +wine_id;
        yield db('wines').where('id', int_wine_id).del();
        res.status(202).end();
    }
    catch (err) {
        res.status(500);
        res.send(err);
    }
}));
export default routes;
