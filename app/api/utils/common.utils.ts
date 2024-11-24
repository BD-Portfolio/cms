export const createSlug = (title: string) => {
    const titleInLowerCase = title.toLowerCase();
    const splittedTitle = titleInLowerCase.split(" ");
    return splittedTitle.join("-");
}