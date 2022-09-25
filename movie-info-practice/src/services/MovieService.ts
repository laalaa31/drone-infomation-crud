import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieUpdateDto } from "../interfaces/movie/MovieUpdateDto";
import { MovieResponseDto } from "../interfaces/movie/MovieResponseDto";
import Movie from "../models/Movie";
import { MovieCommentCreateDto } from "../interfaces/movie/MovieCommentCreateDto";
import { MovieCommentInfo, MovieInfo } from "../interfaces/movie/MovieInfo";
import { MovieCommentUpdateDto } from "../interfaces/movie/MovieCommentUpdateDto";
import { MovieOptionType } from "../interfaces/movie/MovieOptionType";
import { MoviesResponseDto } from "../interfaces/movie/MoviesResponseDto";

const createMovie = async (movieCreateDto: MovieCreateDto): Promise<PostBaseResponseDto> => {
    try {
        const movie = new Movie(movieCreateDto);

        await movie.save();

        const data = {
            _id: movie.id
        };
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateMovie = async (movieId: string, movieUpdateDto: MovieUpdateDto) => {
    try {
        await Movie.findByIdAndUpdate(movieId, movieUpdateDto);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findMovieById = async (movieId: string): Promise<MovieResponseDto | null> => {
    try {
        const movie = await Movie.findById(movieId).populate('comments.writer');

        if (!movie) {
            return null;
        }

        return movie;
    } catch (error) {
        console.log(error);
        throw error;
    }

}

const deleteMovie = async (movieId: string): Promise<void> => {
    try {
        await Movie.findByIdAndDelete(movieId);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getMoviesBySearch = async (search: string, option: MovieOptionType, page: number): Promise<MoviesResponseDto> => {
    const regex = (pattern: string) => new RegExp(`.*${pattern}.*`);

    let movies: MovieInfo[] = [];
    const perPage: number = 2;

    try {
        const titleRegex: RegExp = regex(search);

        if (option === 'title') {
            movies = await Movie.find({ title: { $regex: titleRegex } }) // title 중 패턴과 맞는 것 찾아서 반환
                .sort({ createdAt: -1 })
                .skip(perPage * (page - 1))
                .limit(perPage);
        } else if (option === 'director') {
            movies = await Movie.find({ director: { $regex: titleRegex } })
                .sort({ createdAt: -1 })
                .skip(perPage * (page - 1))
                .limit(perPage);
        } else {
            movies = await Movie.find({
                $or: [
                    { title: { $regex: titleRegex } },
                    { director: { $regex: titleRegex } }
                ]
            })
                .sort({ createdAt: -1 })
                .skip(perPage * (page - 1))
                .limit(perPage);
        }

        const total: number = await Movie.countDocuments({});
        const lastPage: number = Math.ceil(total / perPage);

        const data = {
            movies,
            lastPage
        }

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }

}
const createMovieComment = async (movieId: string, movieCommentCreateDto: MovieCommentCreateDto): Promise<MovieInfo | null> => {
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) return null;

        const newComments: MovieCommentInfo[] = [...movie.comments, movieCommentCreateDto];

        const updatedMovie = await Movie.findOneAndUpdate({ _id: movieId }, { comments: newComments }, { new: true });
        //new: true => 업데이트 후 내용을 받아온다

        if (!updatedMovie) return null;

        return updatedMovie;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateMovieComment = async (movieId: string, commentId: string, userId: string, movieCommentUpdateDto: MovieCommentUpdateDto): Promise<MovieInfo | null> => {
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) return null;

        const data = await Movie.findOneAndUpdate(
            { _id: movieId, comments: { $elemMatch: { _id: commentId, writer: userId } } },
            {
                $set: {
                    'comments.$.writer': userId,
                    'comments.$.comment': movieCommentUpdateDto.comment
                }
            },
            { new: true }
        );

        return data;
    } catch (error) {
        console.log(error);
        throw error;
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
