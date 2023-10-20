/* eslint-disable import/no-extraneous-dependencies */
const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        id, title, tags, body, createdAt, updatedAt,
    };
    notes.push(newNote);
    const isSucces = notes.filter((note) => note.id === id).length > 0;

    if (isSucces) {
        const response = h.response({
            status: 'Success',
            message: 'Data telah berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        console.log('Berhasil');
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'Failed',
        message: 'Data tidak berhasil ditambahkan',
    });
    response.code(400);
    return response;
};

const getAllNotesHandler = () => ({
    status: 'Success',
    data: {
        notes,
    },
});

const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'Success',
            data: {
                note,
            },
        };
    }
    const response = h.response({
        status: 'Fail',
        message: 'Tidak Bisa Menemukan Catatan',
    });
    response.code(404);
    return response;
};

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
        const response = h.response({
            status: 'Success',
            message: 'Catatan Berhasil Diedit',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'Fail',
        message: 'Tidak Bisa Mengedit Catatan',
    });
    response.code(404);
    return response;
};

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'Success',
            message: 'Data berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'Fail',
        message: 'Tidak Bisa Menghapus Catatan',
    });
    response.code(404);
    return response;
};

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
};
