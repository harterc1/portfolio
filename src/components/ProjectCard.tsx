import Link from "next/link";
import Tag from "./Tag";
import Image from "next/image";

const ProjectCard = ({
  title,
  src,
  href,
  tags,
  years,
}: {
  title: string,
  src: string,
  href: string,
  tags: string[],
  years: number[],
}) => (
  <Link className="!opacity-100 bg-neutral-800 rounded-xl pt-6 pb-8 px-8" href={href}>
    <article>
      <h2 className="inline text-3xl uppercase font-extrabold mr-2">
        { title }
      </h2>
      <span className="text-xs text-neutral-400 italic my-2">{`${years[0]} - ${years[1]}`}</span>
      <div className="flex my-2 gap-1.5 flex-wrap pb-1">
        {tags.map(tag => (
          <Tag key={tag}>{ tag }</Tag>
        ))}
      </div>
      <Image className="rounded-md" src={src} alt={title} width={1067} height={720} />
    </article>
  </Link>
)

export default ProjectCard