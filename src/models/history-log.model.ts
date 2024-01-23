import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import mongoose from 'mongoose';

export enum ActionType {
    Created = 'Created',
    Updated = 'Updated',
    Deleted = 'Deleted',
}

@modelOptions({ schemaOptions: { collection: 'history_logs' } })
class HistoryLog {
    @prop({ required: true })
    public itemId!: string;

    @prop({ required: true })
    public collectionName!: string;

    @prop({ required: true, enum: ActionType })
    public actionType!: ActionType;

    @prop({ type: () => mongoose.Schema.Types.Mixed })
    public differences?: Partial<any>;
}

const HistoryLogModel = getModelForClass(HistoryLog);
export default HistoryLogModel;

export type HistoryLogModelType = typeof HistoryLogModel;
