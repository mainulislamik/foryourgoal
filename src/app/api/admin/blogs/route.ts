import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/admin-auth";
import fs from "fs/promises";
import path from "path";
import { blogsData, BlogPost } from "@/data/blogs";

export const dynamic = "force-dynamic";

const DATA_DIR = path.join(process.cwd(), "data");
const BLOGS_FILE = path.join(DATA_DIR, "custom-blogs.json");

async function getCustomBlogs(): Promise<BlogPost[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = await fs.readFile(BLOGS_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return blogsData;
  }
}

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const blogs = await getCustomBlogs();
  return NextResponse.json({ success: true, blogs });
}

export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const post: BlogPost = await req.json();
    if (!post.title || !post.slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const current = await getCustomBlogs();
    const existingIndex = current.findIndex((b) => b.slug === post.slug);

    if (existingIndex >= 0) {
      current[existingIndex] = post;
    } else {
      current.unshift(post);
    }

    await fs.writeFile(BLOGS_FILE, JSON.stringify(current, null, 2), "utf8");
    return NextResponse.json({ success: true, blog: post });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to save blog" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "Slug required" }, { status: 400 });
    }

    let current = await getCustomBlogs();
    current = current.filter((b) => b.slug !== slug);
    await fs.writeFile(BLOGS_FILE, JSON.stringify(current, null, 2), "utf8");

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to delete blog" }, { status: 500 });
  }
}
