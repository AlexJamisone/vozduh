import type { FaqInputName } from '~/store/useFaq';
import {v4 as uuid} from 'uuid'

type FAQInput = {
	id: string;
	name: FaqInputName;
    placeholder: string
    label: string
    isTextarea?: boolean
};
export const faq: FAQInput[] = [
    {
        id: uuid(),
        name: "title",
        placeholder: "Придумай/укажи вопрос",
        label: "Вопрос",
    },
    {
        id: uuid(),
        name: "content",
        placeholder: "Укажи развернутый ответ!",
        isTextarea: true,
        label: "Ответ"
    }
]
