import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const CourseForm = ({course, allAuthors, onSave, onChange, saving, errors}) => {
  return (
    <form>
    <h1>Manage Course</h1>
    <TextInput name="title" label="Title" value={course.title}
      onChange={onChange} error={errors && errors.title && errors.title.length > 0 ? errors.title : ''} />

    <SelectInput name="authorId" label="Author" value={course.authorId}
      defaultOption="Select Author" options={allAuthors} onChange={onChange}
      error={errors && errors.authorId && errors.authorId.length > 0 ? errors.authorId : ''} />

    <TextInput name="category" label="Category" value={course.category}
      onChange={onChange} error={errors && errors.category && errors.category.length > 0 ? errors.category : ''} />

    <TextInput name="length" label="Length" value={course.length}
      onChange={onChange} error={errors && errors.length && errors.length > 0 ? errors.length : ''} />

    <input type="submit" disabled={saving}
      value={saving ? 'Saving...' : 'Save'} className="btn btn-primary"
      onClick={onSave} />

    </form>
  );
};

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  allAuthors: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default CourseForm;
