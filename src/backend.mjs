import PocketBase from 'pocketbase';

const db = new PocketBase('http://127.0.0.1:8090/');

export async function getOffres() {
    try {
        let data = await db.collection('maison').getFullList({
            sort: 'id',
        });
        data = data.map((maison) => {
            maison.imgUrl = db.files.getUrl(maison, maison.images);
            return maison;
        });
        console.log(data);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getOffre(id) {
    try {
        let data = await db.collection('maison').getOne(id);
        data.imageUrl = db.files.getURL(data, data.image);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function getMaisonsBySurface(surface) {
    try {
        let data = await db.collection('maison').getFullList({
            sort: 'id',
        });
        data = data.map((maison) => {
            maison.imgUrl = db.files.getURL(maison, maison.images);
            return maison;
        });
        data = data.filter((maison) => maison.surface > surface)
        console.log(data);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function addOffre(house) {
    try {
        await db.collection('maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

export async function filterByPrix(minPrix, maxPrix) {
    try {
        let data = await db.collection('maison').getFullList({
            sort: 'id',
        });
        data = data.map((maison) => {
            maison.imgUrl = db.files.getURL(maison, maison.images);
            return maison;
        });
        data = data.filter((maison) => maison.prix > minPrix && maison.prix < maxPrix)
        console.log(data);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getAgents() {
    try {
        let data = await db.collection('agent').getFullList({
            sort: 'id',
        });
        data = data.map((agent) => {
            return agent;
        });
        console.log(data);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}