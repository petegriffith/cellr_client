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
routes.get('/allEncounters', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const encounters = yield db('encounters');
        res.status(200).send(encounters);
    }
    catch (err) {
        res.status(500);
        res.send(err);
    }
}));
routes.get('/:wine_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { wine_id } = req.params;
        const encounters = yield db('encounters').where('id', wine_id);
        res.status(200).send(encounters);
    }
    catch (err) {
        res.status(500);
        res.send(err);
    }
}));
routes.post('/post/:wine_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { wine_id } = req.params;
        const newEncounter = req.body;
        newEncounter.wine_id = wine_id;
        yield db('encounters').insert(newEncounter);
        res.status(200).send(newEncounter);
    }
    catch (err) {
        res.status(500);
        res.send(err);
    }
}));
routes.delete('/delete/:encounterId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { encounterId } = req.params;
        const intEncounterId = +encounterId;
        yield db('encounters').where('id', intEncounterId).del();
        res.status(202).send(intEncounterId);
    }
    catch (err) {
        res.status(500);
        res.send(err);
    }
}));
export default routes;
