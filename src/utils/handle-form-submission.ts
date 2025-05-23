import { z } from 'zod';
import TextToSpeech from '../classes/text-to-speech';
import type { MessageInput } from './message-events';

type FormSubmissionInput = {
  textToSpeech: TextToSpeech;
  message: MessageInput;
};

const handleFormSubmission = async ({
  textToSpeech,
  message
}: FormSubmissionInput) => {
  const textToSpeechConfigSchema = z.object({
    lang: z.string(),
    systemLang: z.string(),
    volume: z.coerce.number(),
    rate: z.coerce.number(),
    pitch: z.coerce.number()
  });

  const parsedMessage = textToSpeechConfigSchema.safeParse(message.formEntries);

  if (!parsedMessage.success) {
    return;
  }

  const { data: updatedUserSpecs } = parsedMessage;

  textToSpeech.configure({
    lang: updatedUserSpecs.lang,
    volume: updatedUserSpecs.volume,
    rate: updatedUserSpecs.rate,
    pitch: updatedUserSpecs.pitch
  });

  return updatedUserSpecs;
};

export { handleFormSubmission };
