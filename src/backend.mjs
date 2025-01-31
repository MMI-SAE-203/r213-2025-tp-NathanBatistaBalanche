import PocketBase from 'pocketbase';

const db = new PocketBase('http://127.0.0.1:8090/');

export async function getOffres() {
    try {
        let data = await db.collection('maison').getFullList({
            sort: 'id',
        });
        data = data.map((maison) => {
            maison.imageUrl = db.files.getUrl(maison, maison.image);
            return maison;
        });
        console.log(data);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}
