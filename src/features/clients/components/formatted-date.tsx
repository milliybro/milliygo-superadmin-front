import dayjs from "dayjs";
import "dayjs/locale/uz"; // Lotincha
import "dayjs/locale/ru"; // Ruscha

const getLocale = () => {
  const lang = localStorage.getItem("i18nextLng");

  switch (lang) {
    case "uz-latin":
      return "uz"; // dayjs `uz` ni qo‘llaydi
    case "uz-cryllic":
      return "ru"; // Rus tilida formatlab, keyin o‘zimiz o‘zgartiramiz
    case "ru":
      return "ru";
    default:
      return "en"; // Default til
  }
};

// Kirillcha oylarga mos nomlarni qo‘lda qo‘shamiz
const convertToCyrillic = (dateString: string) => {
  const monthsLatin = ["янв.", "февр.", "марта", "апр.", "мая", "июня", "июля", "авг.", "сент.", "окт.", "нояб.", "дек."];
  const monthsCyrillic = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

  monthsLatin.forEach((month, index) => {
    dateString = dateString.replace(month, monthsCyrillic[index]);
  });

  return dateString;
};

const FormattedDate = ({ data }: { data?: string }) => {
  let formattedDate = data ? dayjs(data).locale(getLocale()).format("DD MMM, YYYY") : "-";

  // Agar til `uz-cryllic` bo‘lsa, Kirillcha formatga o‘giramiz
  if (localStorage.getItem("i18nextLng") === "uz-cryllic") {
    formattedDate = convertToCyrillic(formattedDate);
  }

  return <div className="text-center">{formattedDate}</div>;
};

export default FormattedDate;
