import { Document, model, Schema } from 'mongoose';
// @ts-ignore
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';


interface IAdmin extends Document {
    _id: string;
    name: string
    email: string;
    password: string;
    gender?: string;
    isDeleted?: boolean;
    deletedAt?: Date;
    profilePic?: string;
    resetPasswordToken?: string;
}

const adminSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['admin', 'superAdmin'],
            required:true
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date
        },
        profilePic: {
            type: String
        },
        resetPasswordToken: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        discriminatorKey: 'type',
        collection: 'admins'
    }
);

adminSchema.plugin(mongooseLeanVirtuals);

adminSchema.index({
    name: 'text',
    email: 'text'
});

const Admin = model<IAdmin>('Admin', adminSchema);

export { Admin, IAdmin };