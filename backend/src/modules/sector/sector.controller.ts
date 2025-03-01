import { NextFunction, Request, Response } from "express";
import { ResponseModel } from "../../utils/ResponseModel";
import { SectorConstants } from "./sector.constants";
import mongoose from "mongoose";
import { CustomerModel } from "./sector.model";

class SectorController {
    add = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const newTask = new CustomerModel(req.body.data);
            await newTask.save();
            res.status(201).send({
                success: true,
                message: SectorConstants.ADD_SECTOR_SUCCESS,
                StatusCode: 201
            } as ResponseModel);
        } catch (error: any) {
            next({
                success: false,
                message: error.message,
                StatusCode: 400
            } as ResponseModel);
        }
    };

    getAll = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { page = '0', perPage = '5', sortOrder = 'asc', field = 'firstName' } = req.query;
            const pageSize = parseInt(perPage as string);
            const pageNumber = parseInt(page as string);
            const sortOrderValue: mongoose.SortOrder = sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : 'asc';
            // const fieldName = field === "lastName" ? { lastName: sortOrderValue } : { firstName: sortOrderValue };

            const result = await CustomerModel.find()
                .limit(pageSize)
                .skip(pageSize * pageNumber)
                .sort({ lastName: sortOrderValue });

            if (result.length === 0) {
                return res.sendStatus(404);
            }

            res.status(200).send({
                success: true,
                message: SectorConstants.FETCH_SECTOR_SUCCESS,
                StatusCode: 200,
                data: result
            } as ResponseModel);
        } catch (error: any) {
            next({
                success: false,
                message: error.message,
                StatusCode: 400
            } as ResponseModel);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const customerId = req.params.customerId;
            if (!mongoose.isValidObjectId(customerId)) {
                return next({
                    success: false,
                    message: "Please send a valid Sector ID",
                    StatusCode: 400
                } as ResponseModel);
            }

            const result = await CustomerModel.findById(customerId);
            if (!result) {
                return res.status(404).send({
                    success: false,
                    message: SectorConstants.NOT_FOUND,
                    StatusCode: 404
                } as ResponseModel);
            }

            res.status(200).send({
                success: true,
                message: SectorConstants.FETCH_SECTOR_SUCCESS,
                StatusCode: 200,
                data: result
            } as ResponseModel);
        } catch (error: any) {
            next({
                success: false,
                message: error.message,
                StatusCode: 400
            } as ResponseModel);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const customerId = req.params.customerId;
            if (!mongoose.isValidObjectId(customerId)) {
                return next({
                    success: false,
                    message: "Please send a valid Customer ID",
                    StatusCode: 400
                } as ResponseModel);
            }

            const result = await CustomerModel.findByIdAndUpdate(customerId, req.body, { new: true });
            if (!result) {
                return next({
                    success: false,
                    message: `Customer does not exist with ID: ${customerId}`,
                    StatusCode: 400
                } as ResponseModel);
            }

            res.status(200).send({
                success: true,
                message: SectorConstants.UPDATE_SECTOR_SUCCESS,
                data: result,
                StatusCode: 200
            } as ResponseModel);
        } catch (error: any) {
            next({
                success: false,
                message: error.message,
                StatusCode: 400
            } as ResponseModel);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const customerId = req.params.customerId;
            if (!mongoose.isValidObjectId(customerId)) {
                return next({
                    success: false,
                    message: `Not a valid Customer ID: ${customerId}`,
                    StatusCode: 400
                } as ResponseModel);
            }

            const customer = await CustomerModel.findById(customerId);
            if (!customer) {
                return res.sendStatus(404);
            }

            const result = await CustomerModel.deleteOne({ _id: customerId });
            if (result.deletedCount > 0) {
                return res.sendStatus(204);
            } else {
                return res.status(400).send({
                    success: false,
                    message: "Customer not deleted",
                    StatusCode: 400
                } as ResponseModel);
            }
        } catch (error: any) {
            next({
                success: false,
                message: error.message,
                StatusCode: 500
            } as ResponseModel);
        }
    }
}

export default SectorController;