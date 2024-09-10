import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase
        .from('cabins')
        .select('*')
    if (error) {
        console.log(error)
        throw new Error('Cabins could not be loaded')
    }
    return data
}
export async function deleteCabin(id) {
    const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)
    if (error) {
        console.log(error)
        throw new Error('cabin could not deleted')
    }
}
export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)
    const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '')
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    let query = supabase.from('cabins')
    //for CREATE
    if (!id)
        query = query
            .insert([{ ...newCabin, image: imagePath }])
    
    //for EDIT
    if (id)
        query = query
            .update({ ...newCabin, image: imagePath })
            .eq('id', id)

    const { data, error } = await query.select()

    if (error) {
        console.log(error)
        throw new Error('cabin could not created')
    }

    if (hasImagePath) return data
    // upload image
    const { error: storageError } = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)
    if (storageError) {
        await supabase.from('cabins').delete().eq('id', data.id)
        console.log(storageError)
        throw new Error('cabin image could not be uploaded')
    }
    return data

}