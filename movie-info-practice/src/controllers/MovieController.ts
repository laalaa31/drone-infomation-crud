import express, { Request, Response } from "express";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieUpdateDto } from "../interfaces/movie/MovieUpdateDto";
import { validationResult } from "express-validator";
import MovieService from "../services/MovieService";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util"
import { MovieCommentCreateDto } from "../interfaces/movie/MovieCommentCreateDto";
import { MovieCommentUpdateDto } from "../interfaces/movie/MovieCommentUpdateDto";
import { MovieOptionType } from "../interfaces/movie/MovieOptionType";


/**
 *  @route POST /movie
 *  @desc Create Movie
 *  @access Public
 */

const createMovie = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }

    const movieCreateDto: MovieCreateDto = req.body;

    try {
        const data = await MovieService.createMovie(movieCreateDto);

        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_MOVIE_SUCCESS, data));
    } catch (error) {
        console.log(error);
        //서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route PUT /movie/:movieId 
 *  @desc Update Movie
 *  @access Public
 */
const updateMovie = async (req: Request, res: Response) => {
    const movieUpdateDto: MovieUpdateDto = req.body;
    const { movieId } = req.params;

    try {
        await MovieService.updateMovie(movieId, movieUpdateDto);

        res.status(statusCode.NO_CONTENT).send();
    }
    catch (error) {
        console.log(error);
        //서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route GET /movie/:movieId
 *  @desc Get Movie By Movie Id
 *  @access Public
 */

const findMovieById = async (req: Request, res: Response) => {
    const { movieId } = req.params;

    try {
        const data = await MovieService.findMovieById(movieId);

        if (!data) {
            return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.CREATE_MOVIE_SUCCESS, data));

    } catch (error) {
        console.log(error);
        //서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route DELETE /movie/movieId
 *  @desc Delete Movie
 *  @access Public
 */
const deleteMovie = async (req: Request, res: Response) => {
    const { movieId } = req.params;

    try {
        await MovieService.deleteMovie(movieId);

        res.status(statusCode.NO_CONTENT).send();
    }
    catch (error) {
        console.log(error);
        //서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route POST /movie/:movieId/comment 
 *  @desc Create Comment
 *  @access Public
 */

const createMovieComment = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }

    const movieCommentCreateDto: MovieCommentCreateDto = req.body;
    const { movieId } = req.params;

    try {
        const data = await MovieService.createMovieComment(movieId, movieCommentCreateDto);

        if (!data) {
            res.status(statusCode.NOT_FOUND).send(util.success(statusCode.NOT_FOUND, message.NOT_FOUND));
        }

        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_MOVIE_COMMENT_SUCCESS, data));
    } catch (error) {
        console.log(error);
        //서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route PUT /movie/:movieId/comments/:commentId 
 *  @desc Update Movie Comment
 *  @access Private
 */
const updateMovieComment = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }

    const movieCommentUpdateDto: MovieCommentUpdateDto = req.body;
    const { movieId, commentId } = req.params;
    const userId = req.body.user.id;

    try {
        const data = await MovieService.updateMovieComment(movieId, commentId, userId, movieCommentUpdateDto);
        if (!data) {
            return res.status(statusCode.NOT_FOUND).send(util.success(statusCode.NOT_FOUND, message.NOT_FOUND));
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.UPDATE_MOVIE_COMMENT_SUCCESS, data));
    } catch (error) {
        console.log(error);
        //서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route GET /movie?search=&option=&page=
 *  @desc Get Movie By search
 *  @access Public
 */

const getMoviesBySearch = async (req: Request, res: Response) => {
    const { search, option } = req.query;

    const isOptionType = (option: string): option is MovieOptionType => {
        return ['title', 'director', 'title_director'].indexOf(option) !== -1;
    }

    if (!isOptionType(option as string)) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }

    const page: number = Number(req.query.page || 1); //default 1

    try {
        const data = await MovieService.getMoviesBySearch(search as string, option as MovieOptionType, page);

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.SEARCH_MOVIE_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}


export default {
    createMovie,
    updateMovie,
    findMovieById,
    deleteMovie,
    getMoviesBySearch,
    createMovieComment,
    updateMovieComment
}
