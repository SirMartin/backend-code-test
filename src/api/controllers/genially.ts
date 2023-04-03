import { Response, Request } from "express";
import CreateGeniallyService from "../../contexts/core/genially/application/Create/CreateGeniallyService";
import RenameGeniallyService from "../../contexts/core/genially/application/Rename/RenameGeniallyService";
import DeleteGeniallyService from "../../contexts/core/genially/application/Delete/DeleteGeniallyService";
import InMemoryGeniallyRepository from "../../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";

const repository = new InMemoryGeniallyRepository();

export const createGenially = async (req: Request, res: Response) => {
    const createGeniallyService = new CreateGeniallyService(repository);

    const genially = await createGeniallyService.execute(req.body);

    res.status(201).send(genially);
};

export const renameGenially = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name } = req.body;
    const renameGeniallyService = new RenameGeniallyService(repository);

    const genially = await renameGeniallyService.execute({ id, newName: name });

    res.status(200).send(genially);
};

export const deleteGenially = async (req: Request, res: Response) => {
    const id = req.params.id;
    const deleteGeniallyService = new DeleteGeniallyService(repository);

    await deleteGeniallyService.execute(id);

    res.status(204).send();
};
