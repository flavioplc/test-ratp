import express from "express"
import RATPSaniraireService from "../services/ratp-sanitaires.service";

class ToiletsController {
    async listToilets(req: express.Request, res: express.Response) {
        try {
            const { line } = req?.query;
            if (typeof line !== "string") {
                throw new Error('Missing / bad param line');
            }

            const toilets = await RATPSaniraireService.getToiletsByMetroLines(line);

            res.status(200).json(toilets);
        } catch (err) {
            res.status(400).send(err);
        }
    }

}

export default new ToiletsController();