import React from 'react'
import InputMask from 'react-input-mask';

const OrderMarkdown = ({ product, register, errors, handleSubmit, onSubmit }) => {
  const inputClasses = (error) => {
    if (error) {
      return 'input input-bordered w-full max-w-lg input-error'
    } else {
      return 'input input-bordered w-full max-w-lg input-accent'
    }
  }
  return (
    <>
      <section>
        {product && (
          <div className="card lg:card-side bg-base-100 shadow-md">
            <figure>
              <img src={product?.images[0]} alt="Album" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product?.title}</h2>
              <p className="flex h-auto flex-grow-0">{product?.description}</p>
              <div className="divider"></div>
              <div className="">
                <form className="form-control my-3" >
                  <div role="tablist" className="tabs tabs-bordered">
                    <input
                      type="radio"
                      name="my_tabs_1"
                      role="tab"
                      className="tab text-ellipsis whitespace-nowrap overflow-hidden"
                      aria-label="Персональні дані"
                    // className=""
                    />
                    <div role="tabpanel" className="tab-content py-3">
                      <label className="form-control w-full lg:max-w-md mb-3">
                        <div className="label">
                          <span className="label-text">
                            Ім'я <span>*</span>
                          </span>
                        </div>
                        <input
                          {...register("first_name", { required: true })}
                          type="text"
                          name="first_name"
                          placeholder={errors.first_name && "Поле обов'якове"}
                          className={inputClasses(errors?.first_name)}
                        />
                      </label>
                      <label className="form-control w-full lg:max-w-md mb-3">
                        <div className="label">
                          <span className="label-text">
                            Прізвище <span>*</span>
                          </span>
                        </div>
                        <input
                          {...register("last_name", { required: true })}
                          type="text"
                          name="last_name"
                          placeholder={errors.last_name && "Поле обов'якове"}
                          className={inputClasses(errors.last_name)}
                        />
                      </label>
                      <label className="form-control w-full lg:max-w-md mb-3">
                        <div className="label">
                          <span className="label-text">
                            Телефон <span>*</span>
                          </span>
                        </div>
                        <InputMask
                          mask="+38 (099) 999-99-99"
                          alwaysShowMask
                          {...register("phone", {
                            required: true,
                            pattern: /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                          })}
                        >
                          {(inputProps) => (
                            <input
                              {...inputProps}
                              type="text"
                              placeholder={errors.phone && "Поле обов'якове"}
                              className={inputClasses(errors.phone)}
                            />
                          )}
                        </InputMask>
                      </label>
                      <label className="form-control w-full lg:max-w-md mb-3">
                        <div className="label">
                          <span className="label-text">E-mail</span>
                        </div>
                        <input
                          type="text"
                          {...register("email", {
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          })}
                          name="email"
                          placeholder={errors.email && "Невірний формат email"}
                          className={inputClasses(errors.email)}
                        />
                      </label>
                    </div>
                    <input
                      type="radio"
                      name="my_tabs_1"
                      role="tab"
                      className="tab"
                      aria-label="Доставка"
                      defaultChecked

                    />
                    <div role="tabpanel" className="tab-content py-3">
                      <div className="form-control w-full lg:max-w-md mb-3  border p-3 border-accent rounded-xl">
                        <div className='flex'>
                          <input type="radio" name="delivery" value="myself" {...register("delivery")} className="radio radio-accent" defaultChecked />
                          <p className='text-right'>Самовивіз</p>

                        </div>
                        <div className='divider'></div>
                        <div className='flex flex-row justify-between w-full'>
                          <p>Пункт видачі: вул. Хрещатик, 22, Київ, Україна</p>
                        </div>
                      </div>
                      <div className="form-control w-full lg:max-w-md mb-3  border p-3 border-accent rounded-xl">
                        <div className='flex'>
                          <input type="radio" name="delivery" value="delivery"  {...register("delivery")} className="radio radio-accent" />
                          <p className='text-right'>Доставка</p>
                        </div>

                      </div>
                      <div className="form-control w-full lg:max-w-md mb-3">
                        {/* {watch("delivery") === "delivery" && (
                          
                          <div>sadsadsad</div>
                           
                        )} */}
                      </div>
                      <button onClick={handleSubmit(onSubmit)}>Перевірити</button>

                    </div>
                    <input
                      type="radio"
                      name="my_tabs_1"
                      role="tab"
                      className="tab"
                      aria-label="Оплата"

                    />
                    <div role="tabpanel" className="tab-content py-3">
                      Оплата
                    </div>
                  </div>
                  <div>


                    <button
                      type="button"
                      className="btn btn-primary form-control w-full lg:max-w-md mb-3"
                      onClick={() => {
                        const tabs = document.getElementsByName("my_tabs_1");
                        for (let i = 0; i < tabs.length; i++) {
                          if (tabs[i].checked) {
                            tabs[i].checked = false;
                            tabs[(i + 1) % tabs.length].checked = true;
                            break;
                          }
                        }
                      }}
                    >
                      Далі
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default OrderMarkdown