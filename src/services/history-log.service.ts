import { ActionType } from '@/models/history-log.model';
import HistoryLogModel from '@/models/history-log.model';

class HistoryLogService {
    private historyLogModel: typeof HistoryLogModel;

    constructor() {
        this.historyLogModel = HistoryLogModel;
    }

    async logAction(
        itemId: string,
        collectionName: string,
        actionType: ActionType,
        differences?: Partial<any>,
    ): Promise<void> {
        const logEntry = new this.historyLogModel({
            itemId,
            collectionName,
            actionType,
            differences,
        });

        await logEntry.save();
    }
}

export default HistoryLogService;
