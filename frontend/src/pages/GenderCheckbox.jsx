const GenderCheckbox = ({onCheckboxChange , selectedGender}) => {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text text-gray-600'>Male</span>
					<input checked={selectedGender ==="male"}  onChange={()=> onCheckboxChange("male")} type='checkbox' className='checkbox checkbox-primary border-slate-900' />
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text text-gray-600 px-2'>Female</span>
					<input  checked= {selectedGender ==="female"}
						onChange = {()=>onCheckboxChange("female")}
					type='checkbox' className='checkbox checkbox-primary border-slate-900' />
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;