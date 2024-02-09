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
  <Link className="hover:!opacity-100 mt-6 mb-8 pt-4 border-t-4 border-neutral-800 hover:border-neutral-600 transition-colors" href={href}>
    <article>
      <h2 className="sm:inline text-3xl uppercase font-extrabold mb-0 mr-2">
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