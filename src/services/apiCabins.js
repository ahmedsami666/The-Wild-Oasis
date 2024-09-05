import supabase from "./supabase";

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
export async function createCabin(newCabin) {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '')
    const imagePath = `${import.meta.env.supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    const { data, error } = await supabase
        .from('cabins')
        .insert([{ ...newCabin, image: imagePath }])
        .select()
    if (error) {
        console.log(error)
        throw new Error('cabin could not created')
    }
    const { error: storageError } = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)
    if (storageError) {
        await supabase.from('cabins').delete().eq('id', data.id )
        console.log(storageError)
        throw new Error('cabin image could not be uploaded')
    }
    return data

}