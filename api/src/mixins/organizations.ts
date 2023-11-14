import { Transaction } from 'sequelize';
import { OrganizationLocations, Organizations } from '../database/models';
import { OrganizationAliases } from '../database/models/organizationAliases';
import { CreateUpdateOrganizationLocation } from '../types/CreateUpdateOrganizationDTO';

export async function setLocations(organization: Organizations, locations: CreateUpdateOrganizationLocation[], t: Transaction) {
	const currentLocations = await OrganizationLocations.findAll({
		where: {
			organizationId: organization.id,
		},
	});
	
	const locationsToCreate = locations.filter(location => !location.id);
	const createPromise = OrganizationLocations.bulkCreate(
		locationsToCreate.map(location => ({
			...location,
			organizationId: organization.id,
		})),
		{ transaction: t }
	);

	const locationsToUpdate = locations.filter(location => location.id && currentLocations.find(currentLocation => currentLocation.id === location.id));
	const updatePromise = Promise.all(
		locationsToUpdate.map(location => {
			const currentLocation = currentLocations.find(currentLocation => currentLocation.id === location.id);
			return currentLocation!.update(location, { transaction: t });
		})
	);

	const locationsToDelete = currentLocations
		.filter(location => !locations.find(currentLocation => currentLocation.id === location.id))
		.map(location => location.id);
  
	const destroyPromise = OrganizationLocations.destroy({
		where: {
			id: locationsToDelete,
		}, 
		transaction: t,
	});

	return await Promise.all([createPromise, updatePromise, destroyPromise]);
}

export async function setAliases(organization: Organizations, aliases: string[], t: Transaction) {
	const currentAliases = await OrganizationAliases.findAll({
		where: {
			organizationId: organization.id,
		},
	});
	
	const aliasesToRemove = currentAliases
		.map((alias) => alias.alias)
		.filter(alias => !aliases.includes(alias));
  
	const destroyPromise = OrganizationAliases.destroy({
		where: {
			alias: aliasesToRemove,
			organizationId: organization.id,
		},
		transaction: t,
	});

	const aliasesToCreate = aliases.filter(alias => !currentAliases.find(currentAlias => currentAlias.alias === alias));
	const createPromise = OrganizationAliases.bulkCreate(
		aliasesToCreate.map(alias => ({
			alias,
			organizationId: organization.id,
		})),
		{ transaction: t }
	);
	
	return await Promise.all([destroyPromise, createPromise]);
}