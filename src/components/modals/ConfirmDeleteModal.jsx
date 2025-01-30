/* eslint-disable react/prop-types */
import { Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  TransitionChild,
} from '@headlessui/react';
import { Transition } from '@headlessui/react';

const ConfirmDeleteModal = ({ product, onConfirm, onCancel }) => {
  return (
    <Transition appear show as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onCancel}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-200'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-full p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-200'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                <DialogTitle
                  as='h3'
                  className='text-2xl font-medium leading-6 text-primary'
                >
                  Delete Product
                </DialogTitle>
                <Description as='p' className='mt-2 text-lg text-primary'>
                  Weet je zeker dat je <strong>{product.title}</strong> wilt
                  verwijderen?
                </Description>
                <div className='flex justify-end gap-4 mt-6'>
                  <button
                    className='px-4 py-2 font-bold text-gray-700 bg-gray-200 rounded-md'
                    onClick={onCancel}
                  >
                    Terug
                  </button>
                  <button
                    className='px-4 py-2 font-bold rounded-md text-primary bg-secondary hover:bg-primary hover:text-secondary'
                    onClick={onConfirm}
                  >
                    Verwijderen
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmDeleteModal;
