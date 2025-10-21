type Props = {
  title: string;
  description: string;
  link?: string;
  className?: string;
};

const CardWithInfo = (props: Props) => {
  return (
    <section className={`flex flex-col ${props.className}`}>
      <div className="w-[16%] aspect-[16/9] rounded bg-gray-200 shadow">
        <img src="" alt="" />
      </div>
      <div className="pt-2">
        <p className="text-lg font-bold">{props.title}</p>
        <p>{props.description}</p>
      </div>
    </section>
  );
};

export default CardWithInfo;
