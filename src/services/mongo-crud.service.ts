import { Model, Document } from 'mongoose';
import HistoryLogService from './history-log.service';
import { ActionType } from '@/models/history-log.model';

export default class MongoCrudService<T extends Document> {
    private model: Model<T>;
    private collectionName: string;
    private historyLogService: HistoryLogService;

    constructor(model: Model<T>) {
        this.model = model;
        this.collectionName = model.collection.name;
        this.historyLogService = new HistoryLogService();
    }

    private getUpdatedFields(original: T, updated: T): Partial<T> {
        const changes: Record<string, unknown> = {};
        const originalDoc = original.toObject();
        const updatedDoc = updated.toObject();

        for (const key in updatedDoc) {
            if (
                Object.prototype.hasOwnProperty.call(updatedDoc, key) &&
                originalDoc[key] !== updatedDoc[key] &&
                ['_id', '__v'].indexOf(key) === -1
            ) {
                changes[key] = {
                    current: updatedDoc[key],
                    previous: originalDoc[key],
                };
            }
        }
        return changes as Partial<T>;
    }

    async create(document: T): Promise<T> {
        const createdDocument = new this.model(document);
        await createdDocument.save();
        await this.historyLogService.logAction(
            createdDocument._id,
            this.collectionName,
            ActionType.Created,
        );
        return createdDocument;
    }

    async update(
        originalId: string,
        updatedData: Partial<T>,
    ): Promise<Partial<T>> {
        const original = await this.model.findById(originalId);

        if (!original) {
            throw new Error('Document not found');
        }

        const updated = await this.model.findByIdAndUpdate(
            originalId,
            updatedData,
            {
                new: true,
            },
        );

        if (!updated) {
            throw new Error('Document not found');
        }

        const differences = this.getUpdatedFields(original, updated);

        await this.historyLogService.logAction(
            updated._id,
            this.collectionName,
            ActionType.Updated,
            differences,
        );

        return updated;
    }

    async delete(documentId: string): Promise<void> {
        const document = await this.model.findByIdAndDelete(documentId);

        if (!document) {
            throw new Error('Document not found');
        }

        await this.historyLogService.logAction(
            document._id,
            this.collectionName,
            ActionType.Deleted,
        );
    }
}
