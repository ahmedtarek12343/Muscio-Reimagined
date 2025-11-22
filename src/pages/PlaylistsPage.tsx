import { usePlaylistsStore } from "@/store/playlists.store";
import { Button } from "@/components/ui/button";
import { Edit, ListPlus, Trash2Icon } from "lucide-react";
import { z } from "zod";
import type { PlaylistType } from "@/constants/type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { Link } from "react-router";

const PlaylistSchema = z.object({
  title: z.string().min(1, "Title is required"),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

const PlaylistsPage = () => {
  const { playlists, addPlaylist, removePlaylist, updatePlaylist } =
    usePlaylistsStore();
  const [formOpen, setFormOpen] = useState(false);
  const [formUpdateOpen, setFormUpdateOpen] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState<PlaylistType>({
    id: "",
    title: "",
    image: "",
    songs: [],
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof PlaylistSchema>>({
    resolver: zodResolver(PlaylistSchema),
    defaultValues: {
      title: "",
      image: "",
    },
  });

  const {
    control: editControl,
    handleSubmit: handleEditSubmit,
    formState: { errors: editErrors, isSubmitting: isEditing },
  } = useForm<z.infer<typeof PlaylistSchema>>({
    resolver: zodResolver(PlaylistSchema),
  });

  const onSubmit = async (data: z.infer<typeof PlaylistSchema>) => {
    addPlaylist({
      id: Date.now().toString(),
      title: data.title,
      image: data.image,
      songs: [],
    });
    setFormOpen(false);
  };

  const onSubmitEdit = async (data: z.infer<typeof PlaylistSchema>) => {
    if (editingPlaylist) {
      updatePlaylist(editingPlaylist.id, {
        title: data.title,
        image: data.image,
      });
      setFormUpdateOpen(false);
      setEditingPlaylist({
        id: "",
        title: "",
        image: "",
        songs: [],
      });
    }
  };
  return (
    <div className="container mx-auto max-h-[80vh] py-5 overflow-y-auto px-5 mt-20 flex flex-col items-center gap-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Existing playlists */}
      {playlists.length > 0 ? (
        playlists.map((playlist) => (
          <Link
            to={`/playlists/${playlist.id}`}
            key={playlist.id}
            className="w-full max-w-xl rounded-2xl border p-4 text-center"
            viewTransition
          >
            {playlist.image && (
              <img
                src={playlist.image}
                alt={playlist.title}
                className="mx-auto mb-2 h-24 w-24 rounded object-cover"
                style={{ viewTransitionName: `playlist-image-${playlist.id}` }}
              />
            )}
            <div className="flex gap-4 items-center">
              <div className="flex flex-col">
                <p className="text-lg font-medium">{playlist.title}</p>
                <p className="text-sm text-muted-foreground">
                  {playlist.songs.length} song
                  {playlist.songs.length !== 1 && "s"}
                </p>
              </div>
              <div className="flex gap-5 ml-auto">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setFormUpdateOpen(true);
                    setEditingPlaylist(playlist);
                  }}
                >
                  <Edit className="h-5 w-5" />
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removePlaylist(playlist.id);
                  }}
                >
                  <Trash2Icon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <Button
          variant="link"
          className="flex items-center gap-2"
          onClick={() => setFormOpen(true)}
        >
          No playlists yet – create your first one
          <ListPlus className="h-5 w-5" />
        </Button>
      )}

      {/* Add playlist dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add a New Playlist</DialogTitle>
            <DialogDescription>
              Give your playlist a name and (optionally) a cover image URL.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="My Awesome Playlist"
                    autoFocus
                  />
                )}
              />
              {errors.title && <FieldError>{errors.title.message}</FieldError>}
            </Field>

            {/* Image URL */}
            <Field>
              <FieldLabel>Image URL (optional)</FieldLabel>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="https://example.com/cover.jpg"
                  />
                )}
              />
              <FieldDescription>
                A square image works best (e.g., 300×300 px or larger).
              </FieldDescription>
              {errors.image && <FieldError>{errors.image.message}</FieldError>}
            </Field>

            <DialogFooter className="gap-3 sm:justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating…" : "Create Playlist"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={formUpdateOpen} onOpenChange={setFormUpdateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update the playlist</DialogTitle>
            <DialogDescription>
              Update your playlist name and cover image URL.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit(onSubmitEdit)} className="space-y-6">
            {/* Title */}
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Controller
                name="title"
                control={editControl}
                defaultValue={editingPlaylist.title}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="My Awesome Playlist"
                    autoFocus
                  />
                )}
              />
              {editErrors.title && (
                <FieldError>{editErrors.title.message}</FieldError>
              )}
            </Field>

            {/* Image URL */}
            <Field>
              <FieldLabel>Image URL (optional)</FieldLabel>
              <Controller
                name="image"
                control={editControl}
                defaultValue={editingPlaylist.image}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="https://example.com/cover.jpg"
                  />
                )}
              />
              <FieldDescription>
                A square image works best (e.g., 300×300 px or larger).
              </FieldDescription>
              {editErrors.image && (
                <FieldError>{editErrors.image.message}</FieldError>
              )}
            </Field>

            <DialogFooter className="gap-3 sm:justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormUpdateOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isEditing}>
                {isEditing ? "Updating…" : "Update Playlist"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {playlists.length > 0 && (
        <Button
          className="fixed bottom-6 right-6 rounded-full p-4 md:p-7 shadow-lg"
          size="icon"
          onClick={() => setFormOpen(true)}
        >
          <ListPlus className="size-4 md:size-7" />
        </Button>
      )}
    </div>
  );
};

export default PlaylistsPage;
