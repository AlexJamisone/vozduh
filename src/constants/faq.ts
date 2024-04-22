import { FaqInputName } from '~/store/useFaq';

type FAQInput = {
	id: number;
	name: FaqInputName;
    placeholder: string
    label: string
    isTextarea?: boolean
};
export const faq: FAQInput[] = [
    {
        id: 1,
        name: "title",
        placeholder: "Придумай/укажи вопрос",
        label: "Вопрос",
    },
    {
        id: 2,
        name: "content",
        placeholder: "Укажи развернутый ответ!",
        isTextarea: true,
        label: "Ответ"
    }
]
