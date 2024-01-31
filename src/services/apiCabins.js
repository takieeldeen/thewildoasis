import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  try {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) throw new Error(error);
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  //If the image starts with the the supabase url http://..... then we dont have a new image else we will have an array
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  //1.Create Cabin
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //1. Create/Edit cabin
  let query = supabase.from("cabins");
  //A. Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B. Edit

  console.log({ ...newCabin, image: imagePath });
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  //02. Uploading image
  //If we already have an image path then we dont need to upload an image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (storageError) {
    // Handle error
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabin image could not be uploaded ");
  }

  return data;
}
