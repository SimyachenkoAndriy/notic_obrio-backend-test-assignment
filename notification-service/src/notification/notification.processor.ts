import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import axios from 'axios';
import { NotificationData } from 'src/types/notification.types';

@Processor('notification-queue')
export class NotificationProcessor {
  @Process('send-notification')
  async handleSendNotification(job: Job<NotificationData>) {
    const { userId, name } = job.data;
    console.log(`Sending push notification to user ${userId} (${name})`);

    const webhookUrl =
      process.env.WEBHOOK_URL ||
      'https://webhook-test.com/31f65c9bf3cdc397178ec6fc5e6fb';

    try {
      const response = await axios.post(webhookUrl, {
        userId,
        name,
        message: 'This is your scheduled push notification',
      });
      console.log('Push notification sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending push notification:', error);
      throw error;
    }
  }
}
