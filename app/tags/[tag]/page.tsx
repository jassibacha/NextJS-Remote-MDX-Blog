import { getPostsMeta } from "@/lib/posts"
import ListItem from "@/app/components/ListItem"
import Link from "next/link"

export const revalidate = 86400

type Props = {
    params: {
        tag: string
    }
}

/**
 * Generates static parameters based on posts metadata.
 * @returns {Array} Array of objects with `tag` property.
 */
export async function generateStaticParams() {
    // Retrieve posts metadata
    const posts = await getPostsMeta()

    // If no posts found, return an empty array
    if (!posts) return []

    // Extract unique tags from posts metadata
    const tags = new Set(posts.map(post => post.tags).flat())

    // Create an array of objects with `tag` property
    return Array.from(tags).map((tag) => ({ tag }))
}


export function generateMetadata({ params: { tag } }: Props) {

    return {
        title: `Posts about ${tag}`
    }
}

/**
 * Renders a list of posts with a specific tag.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.params - The parameters object.
 * @param {string} props.params.tag - The tag to filter posts by.
 * @returns {JSX.Element} - The rendered component.
 */
export default async function TagPostList({ params: { tag } }: Props): Promise<JSX.Element> {
    // Get the metadata for all posts
    const posts = await getPostsMeta()

    // If no posts are available, render a message
    if (!posts) return <p className="mt-10 text-center">Sorry, no posts available.</p>

    // Filter the posts by the specified tag
    const tagPosts = posts.filter(post => post.tags.includes(tag))

    // If no posts match the tag, render a message and a link to go back to the home page
    if (!tagPosts.length) {
        return (
            <div className="text-center">
                <p className="mt-10">Sorry, no posts for that keyword.</p>
                <Link href="/">Back to Home</Link>
            </div>
        )
    }

    // Render the list of posts with the specified tag
    return (
        <>
            <h2 className="text-3xl mt-4 mb-0">Results for: #{tag}</h2>
            <section className="mt-6 mx-auto max-w-2xl">
                <ul className="w-full list-none p-0">
                    {tagPosts.map(post => (
                        <ListItem key={post.id} post={post} />
                    ))}
                </ul>
            </section>
        </>
    )
}
