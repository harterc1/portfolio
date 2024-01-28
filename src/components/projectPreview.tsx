import Link from "next/link";
import Tag from "./Tag";
import Image from "next/image";

const ProjectPreview = ({
  title,
  src,
  href,
  tags,
  bulletPoints,
}: {
  title: string,
  src: string,
  href: string,
  tags?: string[],
  bulletPoints?: string[],
}) => (
  <article className="mt-8">
    <Link href={href}>
      <h2 className="text-3xl font-bold text-white">
        { title }
      </h2>
    </Link>
    {tags && (
      <div className="flex my-2 gap-2">
        {tags.map(tag => (
          <Tag key={tag}>{ tag }</Tag>
        ))}
      </div>
    )}
    <div className="grid gap-12 sm:grid-cols-2 mt-4">
      <div className="relative w-full h-48 bg-neutral-800">
        <Image src={src} alt={title} fill />
      </div>
      <div>
        {bulletPoints && (
          <ul className="list-disc list-inside mb-2">
            {bulletPoints.map(bulletPoint => (
              <li key={bulletPoint}>{ bulletPoint }</li>
            ))}
          </ul>
        )}
        <Link
          className="text-sky-400 font-medium"
          href={href}
          title={`See more of ${title}`}
        >
          See more &#xbb;
        </Link>
      </div>
    </div>
  </article>
)

export default ProjectPreview