const { SchoolRepository } = require('../repository/index');
class SchoolServices {
    constructor() {
        this.schoolRepository = new SchoolRepository();
    }
    
    async createSchool(data) {
        try {
            const school = await this.schoolRepository.createSchool(data);
            return school;
        } catch (error) {
            console.log('Something went wrong in service layer');
            throw {error};
        }
    }

    async deleteSchool(schoolId) {
        try {
            const response = await this.schoolRepository.deleteCity(schoolId);
            return response;
        } catch (error) {
            console.log('Something went wrong in service layer');
            throw {error};
        }
    }

    async updateSchool(schoolId, data) {
        try {
            const school = await this.schoolRepository.updateSchool(schoolId, data);
            return school;
        } catch (error) {
            console.log('Something went wrong in service layer');
            throw {error};
        }
    }

    async getSchool(schoolId) {
        try {
            const school = await this.schoolRepository.getSchool(schoolId);
            return school;
        } catch (error) {
            console.log('Something went wrong in service layer');
            throw {error};
        }
    }

    async listSchools(lat, lng, radius) {
        try {
            const schools = await this.schoolRepository.listSchools(lat, lng, radius);
            return schools.map((school) => ({
            school,
            distance: `${parseFloat(school.distance).toFixed(2)} km`,
            }));
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }
}

module.exports = SchoolServices;