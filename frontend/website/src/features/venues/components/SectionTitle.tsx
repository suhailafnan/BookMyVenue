type SectionTitleProps = {
  title: string;
};

export default function SectionTitle({
  title,
}: SectionTitleProps) {
  return (
    <h2 className="text-3xl font-bold text-[#120A06] mb-6 mt-10">
      {title}
    </h2>
  );
}