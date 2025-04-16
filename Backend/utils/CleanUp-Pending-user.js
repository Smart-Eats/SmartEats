import cron from 'node-cron';
import { PendingUser } from '../model/pendingUser.model.js';

export const CleanUp_Pending_User = () => {
  cron.schedule("*/10 * * * *", async () => {
    // This will run every 10 minutes
    await PendingUser.deleteMany({ expiresAt: { $lt: new Date() } });
    console.log("Cleaned up expired pending users");
  });
};
