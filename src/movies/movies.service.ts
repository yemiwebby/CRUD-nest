import { Injectable, HttpException } from '@nestjs/common';
import { MOVIES } from '../mocks/movies.mock';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './interfaces/movies.interface';
import { CreateMovieDTO } from './dto/create-movie.dto';


@Injectable()
export class MoviesService {
    movies = MOVIES;

    constructor(@InjectModel('Movie') private readonly movieModel: Model<Movie>) { }
    async getMovies(): Promise<Movie[]> {
        const movies = await this.movieModel.find().exec();
        return movies;
    }

    async getMovie(movieID): Promise<Movie> {
        const fetchedMovie = await this.movieModel
            .findById(movieID)
            .exec();
        return fetchedMovie;
        // let id = Number(movieID);

        // return new Promise(resolve => {
        //     const movieTemp = this.movies.find(movie => movie.id === id);

        //     if (!movieTemp) {
        //         throw new HttpException('Movie does not exist!', 404);
        //     }

        //     resolve(movieTemp);
        // });
    }

    async addMovie(createMovieDTO: CreateMovieDTO): Promise<Movie> {
        const addedMovie = await this.movieModel(createMovieDTO);
        return addedMovie.save();
    }

    async updateMovie(movieID, createMovieDTO: CreateMovieDTO): Promise<Movie> {
        const updatedMovie = await this.movieModel
            .findByIdAndUpdate(movieID, createMovieDTO, { new: true });
        return updatedMovie;
    }

    async deleteMovie(movieID): Promise<any> {
        const deletedMovie = await this.movieModel
            .findByIdAndRemove(movieID);
        return deletedMovie;
        // let id = Number(movieID);
        // return new Promise(resolve => {
        //     let index = this.movies.findIndex(movie => movie.id === id);
        //     if (index === -1) {
        //         throw new HttpException('Movie does not exist!', 404);
        //     }
        //     this.movies.splice(1, index);
        //     resolve(this.movies);
        // })
    }
}
