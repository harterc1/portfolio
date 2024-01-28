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
  src?: string,
  href: string,
  tags: string[],
}) => (
  <Link className="opacity-90 hover:opacity-100 active:opacity-80" href={href}>
    <article className="rounded-lg bg-neutral-800 p-4">
      {src && (
        <Image className="rounded-md" src={src} alt={title} width={1067} height={720} />
      )}
      <h2 className="text-3xl">
        { title }
      </h2>
      <div className="flex my-2 gap-1 flex-wrap">
        {tags.map(tag => (
          <Tag key={tag}>{ tag }</Tag>
        ))}
      </div>
    </article>
  </Link>
)

export default ProjectCard