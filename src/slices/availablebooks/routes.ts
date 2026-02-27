import {Request, Response, Router} from 'express';
import {AvailableBooksReadModel, tableName} from "./AvailableBooksProjection.js";
import {WebApiSetup} from "@event-driven-io/emmett-expressjs";
import createClient from "../../supabase/api.js";
import {readmodel} from "../../core/readmodel.js";
import {requireUser} from "../../supabase/requireUser.js";

export const api =
    (
        // external dependencies
    ): WebApiSetup =>
        (router: Router): void => {
            router.get('/api/query/available-books-collection', async (req: Request, res: Response) => {
                try {
                    const principal = await requireUser(req, res, true);
                    if (principal.error) {
                        return;
                    }

                    const userId = principal.user.id;
                    const id = req.query._id?.toString();

                    const supabase = createClient()

                    const query: any = {...req.query, restaurant_id: userId};
                    delete query._id;

                    const data: AvailableBooksReadModel | AvailableBooksReadModel[] | null =
                        id ? await readmodel(tableName, supabase).findById<AvailableBooksReadModel>("id", id) :
                            await readmodel(tableName, supabase).findAll<AvailableBooksReadModel>(query)

                    // Serialize, handling bigint properly
                    const sanitized = JSON.parse(
                        JSON.stringify(data || [], (key, value) =>
                            typeof value === 'bigint' ? value.toString() : value
                        )
                    );

                    return res.status(200).json(sanitized);
                } catch (err) {
                    console.error(err);
                    return res.status(500).json({ok: false, error: 'Server error'});
                }
            });

        };
