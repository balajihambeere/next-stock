import { NextFunction, Request, Response } from "express";
import { ResponseModel } from "../../utils/ResponseModel";
import { SectorConstants } from "./sector.constants";
import mongoose from "mongoose";
import { CustomerModel } from "./sector.model";

class SectorController {
    add = async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body.data)
        const newTask = new CustomerModel(req.body.data);
        try {
            await newTask.save();
            res.sendStatus(201);
        } catch (error: any) {
            next({
                success: false,
                message: error.message,
                StatusCode: 400
            } as ResponseModel);
        }
    };

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        let { page, perPage, sortOrder, field } = req.query;
        const pageSize = parseInt(perPage as string) || 5;
        const pageNumber = parseInt(page as string) || 0;

        const sortOrderValue: mongoose.SortOrder = sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : 'asc';
        const fieldName = field === "lastName" ? { lastName: sortOrderValue } : { firstName: sortOrderValue };
        try {
            const result = await CustomerModel.find().limit(pageSize || 5).skip(pageSize * pageNumber).sort();
            if (result.length === 0) {
                res.sendStatus(404);
            }
            res.status(200).send(result);
        } catch (error: any) {
            next({
                success: false,
                message: error.message,
                StatusCode: 400
            } as ResponseModel);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        const customerId = req.params.customerId;
        if (!mongoose.isValidObjectId(customerId)) {
            next({
                success: false,
                message: "Please Send Validate Customer ID",
                StatusCode: 400
            } as ResponseModel);
        }
        // Find the matching customer
        const result = await CustomerModel.find({ _id: customerId });
        // If there is no such customer then return NotFound
        if (typeof result !== 'undefined' && result.length === 0) {
            res.sendStatus(404);
        }
        res.status(200).send({
            success: true,
            data: result
        } as ResponseModel);
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        const customerId = req.params.customerId;
        if (!mongoose.isValidObjectId(customerId)) {
            next({
                success: false,
                message: "Please Send Validate Customer ID",
                StatusCode: 400
            } as ResponseModel);
        }
        const result = await CustomerModel.findOneAndUpdate({
            _id: customerId
        }, req.body, { new: true });

        if (result === null) {
            next({
                success: false,
                message: `Customer Not exists with ID: ${customerId}`,
                StatusCode: 400
            } as ResponseModel);
        }
        res.status(200).send({
            success: true,
            message: SectorConstants.UPDATE_SECTOR_SUCCESS,
            data: result,
            StatusCode: 200
        } as ResponseModel);
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customerId = req.params.customerId;
            if (!mongoose.isValidObjectId(customerId)) {
                next({
                    success: false,
                    message: `Not A Valid Customer Id: ${customerId}`,
                    StatusCode: 400
                } as ResponseModel);
            }
            // Find the customer to be deleted in the collection.
            const customer = await CustomerModel.findById({ _id: customerId });
            // If there is no such customer, return an error response
            // with status code 404 (Not Found)
            if (customer === null) {
                res.sendStatus(404);
            }
            // Remove the customer from the collection
            // The deleteOne method returns, it returns an object with the property 
            // deletedCount indicating how many documents were deleted
            // was successfully deleted
            const result = await CustomerModel.deleteOne({ _id: customerId });
            if (result.deletedCount > 0) {
                // Return a response message with status code 204 (No Content)
                // To indicate that the operation was successful
                res.sendStatus(204);
            } else {
                // Otherwise return a 400 (Bad Request) error response
                res.status(400).send({
                    success: false,
                    message: "Customer Not Deleted",
                    StatusCode: 400
                } as ResponseModel);
            }

        } catch (error: any) {
            // If an uncaught exception occurs, return an error response
            // with status code 500 (Internal Server Error)
            next(error);
        }
    }
}

export default SectorController;