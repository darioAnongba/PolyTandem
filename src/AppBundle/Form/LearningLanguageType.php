<?php
/**
 * Created by PhpStorm.
 * User: dario
 * Date: 12.03.2016
 * Time: 17:22
 */

namespace AppBundle\Form;

use AppBundle\Entity\LearningLanguage;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\CountryType;
use Symfony\Component\Form\Extension\Core\Type\LanguageType;
use Symfony\Component\Form\FormBuilderInterface;

class LearningLanguageType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('language');
    }

    public function getBlockPrefix()
    {
        return 'app_user_learninglanguage';
    }

    public function getName()
    {
        return $this->getBlockPrefix();
    }
}