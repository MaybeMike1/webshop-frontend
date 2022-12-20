import {httpService} from './httpService';

const categoryService = {
    getAll : getAll,
    getOne : getOne,
    getModel : getModel
}


async function getAll() {
    const res = await httpService.get('/categories');
    return res.data.data;
}

async function getOne(_id : string) {
    const res = await httpService.get('/categories/' + _id);
    return res.data.data;
}

async function getModel(_id : string) {
    const res = await httpService.get('models/' + _id);
    return res.data.data;
}

export default categoryService;