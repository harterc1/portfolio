import Link from "next/link";
import Tag from "./Tag";
import Image from "next/image";

const ProjectCard = ({
  title,
  src,
  href,
  tags,
}: {
  title: string,
  src: string,
  href: string,
  tags: string[],
}) => (
  <Link className="!opacity-100 bg-neutral-800 rounded-xl p-4" href={href}>
    <article>
      <h2 className="text-3xl sm:text-3xl uppercase font-extrabold">
        { title }
      </h2>
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