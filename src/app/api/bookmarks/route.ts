import { NextRequest, NextResponse } from "next/server";
import {
  createBookmark,
  getUserBookmarks,
} from "@/lib/bookmark.utils";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const bookmarks = await getUserBookmarks(userId);
    return NextResponse.json(bookmarks, { status: 200 });
  } catch (error) {
    console.error("Error getting user bookmarks", error);
    return NextResponse.json(
      { error: "Failed to get user bookmarks" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { url, title, notes } = await request.json();
    if (!url || !title) {
      return NextResponse.json(
        { error: "URL and title are required" },
        { status: 400 }
      );
    }
    const bookmark = await createBookmark(userId, { url, title, notes });
    return NextResponse.json(bookmark, { status: 201 });
  } catch (error) {
    console.error("Error creating bookmark", error);
    return NextResponse.json(
      { error: "Failed to create bookmark" },
      { status: 500 }
    );
  }
}


