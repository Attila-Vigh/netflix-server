import { dirname, join, extname } from 'path';
import { fileURLToPath } from 'url';
import uniqid from 'uniqid';
import fs from 'fs-extra';

const { readJSON, writeJSON, writeFile } = fs;

export const publicPath = join(process.cwd(), '/public');

export const getPath = (file) => join(dirname(fileURLToPath(import.meta.url)), file);

// const dataJSONFilePath = getPath('../data/dataList.json');

export const readData = async (dataJSONFilePath) => {
	try
	{
		console.log(`Reading data from file: ${ dataJSONFilePath }`);
		const result = await readJSON(dataJSONFilePath);
		return result;
	}
	catch (error)
	{
		throw new Error(`Read data has failed with error: ${ error }`);
	}
};

export const findDataById = async (id, dataJSONFilePath) => {
	try
	{
		console.log(`Finding data by id: ${ id }`);
		const dataList = await readData(dataJSONFilePath);
		console.log( dataList );
		const data = dataList.find(data => data.imdbID === id);

		if (data)
		{
			return data;
		}
		else
		{
			throw new Error(`data with id: ${ id } not found`);
		}
	}
	catch (error)
	{
		throw new Error(`Find data by id has failed with error: ${ error }`);
	}
};


export const writeData = async (data, dataJSONFilePath) => {
	try
	{
		const dataList = await readData(dataJSONFilePath);
		// const newData = {
		// 	...data,
		// 	id: uniqid(),
		// 	createdAt: new Date().toISOString(),
		// 	updatedAt: new Date().toISOString(),
		// };

		console.log( "dataList: from fs-utils" );
		console.log( dataList );
		let newData = {}
		dataList && dataList.imdbID
			? newData = {
					...data,
					imdbID: uniqid(),
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
				}
			: newData = {
					...data,
					id: uniqid(),
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
				}
		
		dataList.push(newData);

		await writeJSON(dataJSONFilePath, dataList);
		return newData;
	}
	catch (error)
	{
		console.table(error);
		throw new Error(`Write data has failed with error: ${ error }`);
	}
};

export const updateData = async (id, dataToUpdate, dataJSONFilePath) => {
	try
	{
		let dataList = await readData(dataJSONFilePath);
		const dataIndex = dataList.findIndex(data => data.imdbID === id);
		if (dataIndex !== -1)
		{
			let data = dataList[ dataIndex ];

			console.log(`data: `, data);
			let dataUpdated = {
				...data,
				...dataToUpdate,
				imdbID: id,
				updatedAt: new Date().toISOString()
			};
			dataList[ dataIndex ] = dataUpdated;

			await writeJSON(dataJSONFilePath, dataList);

			return dataUpdated;
		}
		else
			throw new Error(`Update data with id ${ id } is not found`);
	}
	catch (error)
	{
		console.log(error);
		throw new Error(`Update data has failed with error: ${ error }`);
	}
};

export const updateDataImage = async (id, file, dataJSONFilePath) => {
	try
	{
		console.log(file);
		const fileName = `${ id }${ extname(file.originalname) }`;

		await writeFile(join(publicPath, fileName), file.buffer);

		return await
			updateData(id, { Poster: `http://localhost:${ process.env.PORT }/images/${ fileName }` }, dataJSONFilePath);
	}
	catch (error)
	{
		throw new Error(`Update data Image has failed with error: ${ error }`);
	}

};

export const deleteData = async (id, dataJSONFilePath) => {
	try
	{
		console.log(id);
		let dataList = await readData(dataJSONFilePath);
		console.log(dataList);
		dataList = dataList.filter(data => 
			data && data.imdbID 
				?  data.imdbID !== id
				:  data.id !== id
		);
		await writeJSON(dataJSONFilePath, dataList);
		console.log(dataList);
	}
	catch (error)
	{
		throw new Error(`Delete data has failed with error: ${ error }`);
	}
};

const fsCRUD = {
	new: writeData,
	read: readData,
	findById: findDataById,
	update: updateData,
	updateImage: updateDataImage,
	delete: deleteData,
};
export default fsCRUD;


